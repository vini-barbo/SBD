package com.portfolio.sbd.repository;

import com.portfolio.sbd.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUserId(UUID userId);
    Page<Order> findByUserId(UUID userId, Pageable pageable);
    List<Order> findByStatus(String status);
}
