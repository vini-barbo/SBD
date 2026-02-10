package com.portfolio.sbd.service;

import com.portfolio.sbd.dto.order.*;
import com.portfolio.sbd.entity.*;
import com.portfolio.sbd.exception.BadRequestException;
import com.portfolio.sbd.exception.ResourceNotFoundException;
import com.portfolio.sbd.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductVariantRepository variantRepository;
    private final StockRepository stockRepository;
    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public Page<OrderResponse> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> findByUserId(UUID userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public OrderResponse findById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado com ID: " + id));
        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse create(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");

        List<OrderItem> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            ProductVariant variant = variantRepository.findById(itemRequest.getProductVariantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Variante não encontrada"));

            // Check stock
            Stock stock = stockRepository.findByProductVariantId(variant.getId())
                    .orElseThrow(() -> new BadRequestException("Estoque não encontrado para este produto"));

            if (stock.getQuantity() < itemRequest.getQuantity()) {
                throw new BadRequestException("Estoque insuficiente para: " + variant.getSku());
            }

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductVariant(variant);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(variant.getPrice());

            items.add(orderItem);

            // Update stock
            stock.setQuantity(stock.getQuantity() - itemRequest.getQuantity());
            stockRepository.save(stock);

            // Calculate total
            totalAmount = totalAmount.add(variant.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setItems(items);
        order.setTotalAmount(totalAmount);

        // Create payment
        if (request.getPaymentMethod() != null) {
            Payment payment = new Payment();
            payment.setOrder(order);
            payment.setPaymentMethod(request.getPaymentMethod());
            payment.setStatus("PENDING");
            order.setPayment(payment);
        }

        // Create shipment
        if (request.getAddressId() != null) {
            Address address = addressRepository.findById(request.getAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

            Shipment shipment = new Shipment();
            shipment.setOrder(order);
            shipment.setAddress(address);
            order.setShipment(shipment);
        }

        Order savedOrder = orderRepository.save(order);
        return mapToResponse(savedOrder);
    }

    @Transactional
    public OrderResponse updateStatus(UUID id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido não encontrado com ID: " + id));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return mapToResponse(updatedOrder);
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = modelMapper.map(order, OrderResponse.class);
        
        if (order.getItems() != null) {
            List<OrderItemResponse> itemResponses = new ArrayList<>();
            for (OrderItem item : order.getItems()) {
                OrderItemResponse itemResponse = new OrderItemResponse();
                itemResponse.setId(item.getId());
                itemResponse.setProductVariantId(item.getProductVariant().getId());
                itemResponse.setProductName(item.getProductVariant().getProduct().getName());
                itemResponse.setSku(item.getProductVariant().getSku());
                itemResponse.setQuantity(item.getQuantity());
                itemResponse.setPrice(item.getPrice());
                itemResponse.setSubtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                itemResponses.add(itemResponse);
            }
            response.setItems(itemResponses);
        }
        
        return response;
    }
}
