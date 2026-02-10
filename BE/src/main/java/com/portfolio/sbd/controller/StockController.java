package com.portfolio.sbd.controller;

import com.portfolio.sbd.dto.stock.StockRequest;
import com.portfolio.sbd.dto.stock.StockResponse;
import com.portfolio.sbd.entity.ProductVariant;
import com.portfolio.sbd.entity.Stock;
import com.portfolio.sbd.exception.ResourceNotFoundException;
import com.portfolio.sbd.repository.ProductVariantRepository;
import com.portfolio.sbd.repository.StockRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
@Transactional
@Tag(name = "Stock", description = "Gerenciamento de estoque")
public class StockController {

    private final StockRepository stockRepository;
    private final ProductVariantRepository variantRepository;

    @GetMapping("/variant/{variantId}")
    @Operation(summary = "Buscar estoque por variante")
    public ResponseEntity<StockResponse> findByVariantId(@PathVariable UUID variantId) {
        Stock stock = stockRepository.findByProductVariantId(variantId)
                .orElseThrow(() -> new ResourceNotFoundException("Estoque não encontrado"));

        StockResponse response = new StockResponse();
        response.setId(stock.getId());
        response.setProductVariantId(stock.getProductVariant().getId());
        response.setSku(stock.getProductVariant().getSku());
        response.setQuantity(stock.getQuantity());

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Criar registro de estoque")
    public ResponseEntity<StockResponse> create(@Valid @RequestBody StockRequest request) {
        ProductVariant variant = variantRepository.findById(request.getProductVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Variante não encontrada"));

        Stock stock = new Stock();
        stock.setProductVariant(variant);
        stock.setQuantity(request.getQuantity());

        Stock savedStock = stockRepository.save(stock);

        StockResponse response = new StockResponse();
        response.setId(savedStock.getId());
        response.setProductVariantId(savedStock.getProductVariant().getId());
        response.setSku(savedStock.getProductVariant().getSku());
        response.setQuantity(savedStock.getQuantity());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar quantidade em estoque")
    public ResponseEntity<StockResponse> update(@PathVariable UUID id, @Valid @RequestBody StockRequest request) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estoque não encontrado"));

        stock.setQuantity(request.getQuantity());
        Stock updatedStock = stockRepository.save(stock);

        StockResponse response = new StockResponse();
        response.setId(updatedStock.getId());
        response.setProductVariantId(updatedStock.getProductVariant().getId());
        response.setSku(updatedStock.getProductVariant().getSku());
        response.setQuantity(updatedStock.getQuantity());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/add")
    @Operation(summary = "Adicionar quantidade ao estoque")
    public ResponseEntity<StockResponse> addQuantity(@PathVariable UUID id, @RequestParam Integer quantity) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estoque não encontrado"));

        stock.setQuantity(stock.getQuantity() + quantity);
        Stock updatedStock = stockRepository.save(stock);

        StockResponse response = new StockResponse();
        response.setId(updatedStock.getId());
        response.setProductVariantId(updatedStock.getProductVariant().getId());
        response.setSku(updatedStock.getProductVariant().getSku());
        response.setQuantity(updatedStock.getQuantity());

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/remove")
    @Operation(summary = "Remover quantidade do estoque")
    public ResponseEntity<StockResponse> removeQuantity(@PathVariable UUID id, @RequestParam Integer quantity) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Estoque não encontrado"));

        stock.setQuantity(Math.max(0, stock.getQuantity() - quantity));
        Stock updatedStock = stockRepository.save(stock);

        StockResponse response = new StockResponse();
        response.setId(updatedStock.getId());
        response.setProductVariantId(updatedStock.getProductVariant().getId());
        response.setSku(updatedStock.getProductVariant().getSku());
        response.setQuantity(updatedStock.getQuantity());

        return ResponseEntity.ok(response);
    }
}
