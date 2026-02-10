-- Create shipments table
CREATE TABLE shipments (
    id UUID PRIMARY KEY,
    order_id UUID NOT NULL UNIQUE,
    address_id UUID NOT NULL,
    tracking_code VARCHAR(100),
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    CONSTRAINT fk_shipments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_shipments_address FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE RESTRICT
);

-- Create indexes for common queries
CREATE INDEX idx_shipments_order_id ON shipments(order_id);
CREATE INDEX idx_shipments_tracking_code ON shipments(tracking_code);
