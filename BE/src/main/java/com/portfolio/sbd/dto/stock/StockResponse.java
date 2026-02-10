package com.portfolio.sbd.dto.stock;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockResponse {
    private UUID id;
    private UUID productVariantId;
    private String sku;
    private Integer quantity;
}
