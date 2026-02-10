package com.portfolio.sbd.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotNull(message = "ID do usuário é obrigatório")
    private UUID userId;

    @NotEmpty(message = "Pedido deve conter ao menos um item")
    @Valid
    private List<OrderItemRequest> items;

    private UUID addressId;
    private String paymentMethod;
}
