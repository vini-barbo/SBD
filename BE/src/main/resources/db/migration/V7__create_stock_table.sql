-- Create stock table
CREATE TABLE stock (
    id UUID PRIMARY KEY,
    product_variant_id UUID NOT NULL UNIQUE,
    quantity INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_stock_product_variant FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);

-- Create index on product_variant_id for faster lookups
CREATE INDEX idx_stock_product_variant_id ON stock(product_variant_id);
