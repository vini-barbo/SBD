-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create index on parent_id for hierarchical queries
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
