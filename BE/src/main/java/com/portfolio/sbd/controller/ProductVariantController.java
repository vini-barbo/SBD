package com.portfolio.sbd.controller;

import com.portfolio.sbd.dto.product.ProductVariantRequest;
import com.portfolio.sbd.dto.product.ProductVariantResponse;
import com.portfolio.sbd.entity.Product;
import com.portfolio.sbd.entity.ProductVariant;
import com.portfolio.sbd.exception.BadRequestException;
import com.portfolio.sbd.exception.ResourceNotFoundException;
import com.portfolio.sbd.repository.ProductRepository;
import com.portfolio.sbd.repository.ProductVariantRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product-variants")
@RequiredArgsConstructor
@Tag(name = "Product Variants", description = "Gerenciamento de variantes de produtos")
public class ProductVariantController {

    private final ProductVariantRepository variantRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @GetMapping("/product/{productId}")
    @Operation(summary = "Listar variantes de um produto")
    public ResponseEntity<List<ProductVariantResponse>> findByProductId(@PathVariable UUID productId) {
        List<ProductVariantResponse> variants = variantRepository.findByProductId(productId).stream()
                .map(v -> modelMapper.map(v, ProductVariantResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(variants);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar variante por ID")
    public ResponseEntity<ProductVariantResponse> findById(@PathVariable UUID id) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Variante não encontrada"));
        return ResponseEntity.ok(modelMapper.map(variant, ProductVariantResponse.class));
    }

    @GetMapping("/sku/{sku}")
    @Operation(summary = "Buscar variante por SKU")
    public ResponseEntity<ProductVariantResponse> findBySku(@PathVariable String sku) {
        ProductVariant variant = variantRepository.findBySku(sku)
                .orElseThrow(() -> new ResourceNotFoundException("Variante não encontrada"));
        return ResponseEntity.ok(modelMapper.map(variant, ProductVariantResponse.class));
    }

    @PostMapping
    @Operation(summary = "Criar nova variante")
    public ResponseEntity<ProductVariantResponse> create(@Valid @RequestBody ProductVariantRequest request) {
        if (variantRepository.existsBySku(request.getSku())) {
            throw new BadRequestException("SKU já existe: " + request.getSku());
        }

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setSize(request.getSize());
        variant.setColor(request.getColor());
        variant.setSku(request.getSku());
        variant.setPrice(request.getPrice());

        ProductVariant savedVariant = variantRepository.save(variant);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(savedVariant, ProductVariantResponse.class));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar variante")
    public ResponseEntity<ProductVariantResponse> update(@PathVariable UUID id, @Valid @RequestBody ProductVariantRequest request) {
        ProductVariant variant = variantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Variante não encontrada"));

        if (!variant.getSku().equals(request.getSku()) && variantRepository.existsBySku(request.getSku())) {
            throw new BadRequestException("SKU já existe: " + request.getSku());
        }

        variant.setSize(request.getSize());
        variant.setColor(request.getColor());
        variant.setSku(request.getSku());
        variant.setPrice(request.getPrice());

        ProductVariant updatedVariant = variantRepository.save(variant);
        return ResponseEntity.ok(modelMapper.map(updatedVariant, ProductVariantResponse.class));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar variante")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!variantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Variante não encontrada");
        }
        variantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
