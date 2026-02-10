-- Create product_variants table
CREATE TABLE product_variants (
    id UUID PRIMARY KEY,
    product_id UUID NOT NULL,
    size VARCHAR(50),
    color VARCHAR(50),
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create indexes for common queries
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_variants_sku ON product_variants(sku);
