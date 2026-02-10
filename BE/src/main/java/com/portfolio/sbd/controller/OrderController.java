package com.portfolio.sbd.controller;

import com.portfolio.sbd.dto.order.OrderRequest;
import com.portfolio.sbd.dto.order.OrderResponse;
import com.portfolio.sbd.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Gerenciamento de pedidos")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @Operation(summary = "Listar todos os pedidos")
    public ResponseEntity<Page<OrderResponse>> findAll(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(orderService.findAll(pageable));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Listar pedidos de um usuário")
    public ResponseEntity<Page<OrderResponse>> findByUserId(
            @PathVariable UUID userId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(orderService.findByUserId(userId, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido por ID")
    public ResponseEntity<OrderResponse> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Criar novo pedido")
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody OrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(request));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status do pedido")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
