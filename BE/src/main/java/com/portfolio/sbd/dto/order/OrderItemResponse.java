package com.portfolio.sbd.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
    private UUID id;
    private UUID productVariantId;
    private String productName;
    private String sku;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}
