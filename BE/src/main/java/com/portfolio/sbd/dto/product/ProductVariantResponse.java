package com.portfolio.sbd.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariantResponse {
    private UUID id;
    private UUID productId;
    private String size;
    private String color;
    private String sku;
    private BigDecimal price;
    private Integer stockQuantity;
}
