package com.portfolio.sbd.controller;

import com.portfolio.sbd.dto.address.AddressRequest;
import com.portfolio.sbd.dto.address.AddressResponse;
import com.portfolio.sbd.entity.Address;
import com.portfolio.sbd.entity.User;
import com.portfolio.sbd.exception.ResourceNotFoundException;
import com.portfolio.sbd.repository.AddressRepository;
import com.portfolio.sbd.repository.UserRepository;
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
@RequestMapping("/addresses")
@RequiredArgsConstructor
@Tag(name = "Addresses", description = "Gerenciamento de endereços")
public class AddressController {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @GetMapping("/user/{userId}")
    @Operation(summary = "Listar endereços de um usuário")
    public ResponseEntity<List<AddressResponse>> findByUserId(@PathVariable UUID userId) {
        List<AddressResponse> addresses = addressRepository.findByUserId(userId).stream()
                .map(addr -> modelMapper.map(addr, AddressResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar endereço por ID")
    public ResponseEntity<AddressResponse> findById(@PathVariable UUID id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));
        return ResponseEntity.ok(modelMapper.map(address, AddressResponse.class));
    }

    @PostMapping
    @Operation(summary = "Criar novo endereço")
    public ResponseEntity<AddressResponse> create(@Valid @RequestBody AddressRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        Address address = new Address();
        address.setUser(user);
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setZipCode(request.getZipCode());
        address.setIsDefault(request.getIsDefault());

        Address savedAddress = addressRepository.save(address);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(modelMapper.map(savedAddress, AddressResponse.class));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar endereço")
    public ResponseEntity<AddressResponse> update(@PathVariable UUID id, @Valid @RequestBody AddressRequest request) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Endereço não encontrado"));

        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setZipCode(request.getZipCode());
        address.setIsDefault(request.getIsDefault());

        Address updatedAddress = addressRepository.save(address);
        return ResponseEntity.ok(modelMapper.map(updatedAddress, AddressResponse.class));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar endereço")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!addressRepository.existsById(id)) {
            throw new ResourceNotFoundException("Endereço não encontrado");
        }
        addressRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
