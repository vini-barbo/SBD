package com.portfolio.sbd.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipmentResponse {
    private UUID id;
    private UUID addressId;
    private String trackingCode;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
}
