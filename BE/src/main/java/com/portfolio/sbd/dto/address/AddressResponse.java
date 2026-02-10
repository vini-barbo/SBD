package com.portfolio.sbd.dto.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {
    private UUID id;
    private UUID userId;
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private Boolean isDefault;
}
