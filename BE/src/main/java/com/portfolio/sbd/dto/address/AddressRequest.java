package com.portfolio.sbd.dto.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequest {

    @NotNull(message = "ID do usuário é obrigatório")
    private UUID userId;

    @NotBlank(message = "Rua é obrigatória")
    private String street;

    @NotBlank(message = "Cidade é obrigatória")
    private String city;

    @NotBlank(message = "Estado é obrigatório")
    private String state;

    @NotBlank(message = "País é obrigatório")
    private String country;

    @NotBlank(message = "CEP é obrigatório")
    private String zipCode;

    private Boolean isDefault = false;
}
