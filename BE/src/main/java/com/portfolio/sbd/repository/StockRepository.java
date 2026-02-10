package com.portfolio.sbd.repository;

import com.portfolio.sbd.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface StockRepository extends JpaRepository<Stock, UUID> {
    @Query("SELECT s FROM Stock s JOIN FETCH s.productVariant WHERE s.productVariant.id = :variantId")
    Optional<Stock> findByProductVariantId(@Param("variantId") UUID productVariantId);
}
