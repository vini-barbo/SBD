package com.portfolio.sbd.dto.product;

import com.portfolio.sbd.dto.category.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private UUID id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private CategoryResponse category;
    private List<ProductVariantResponse> variants;
    private List<ProductImageResponse> images;
}
