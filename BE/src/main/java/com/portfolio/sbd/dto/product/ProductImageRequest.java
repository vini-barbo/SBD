package com.portfolio.sbd.dto.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageRequest {

    @NotNull(message = "ID do produto é obrigatório")
    private UUID productId;

    @NotBlank(message = "URL da imagem é obrigatória")
    private String imageUrl;

    private Boolean isPrimary = false;
}
