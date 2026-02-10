Table users {
  id uuid [pk]
  name varchar
  email varchar [unique]
  password_hash text
  phone varchar
  created_at timestamp
}

Table addresses {
  id uuid [pk]
  user_id uuid
  street varchar
  city varchar
  state varchar
  country varchar
  zip_code varchar
  is_default boolean
}

Table categories {
  id uuid [pk]
  name varchar
  parent_id uuid [null]
}

Table products {
  id uuid [pk]
  category_id uuid
  name varchar
  description text
  base_price decimal
  is_active boolean
  created_at timestamp
}

Table product_variants {
  id uuid [pk]
  product_id uuid
  size varchar
  color varchar
  sku varchar [unique]
  price decimal
}

Table product_images {
  id uuid [pk]
  product_id uuid
  image_url text
  is_primary boolean
}

Table stock {
  id uuid [pk]
  product_variant_id uuid
  quantity int
}

Table orders {
  id uuid [pk]
  user_id uuid
  status varchar
  total_amount decimal
  created_at timestamp
}

Table order_items {
  id uuid [pk]
  order_id uuid
  product_variant_id uuid
  quantity int
  price decimal
}

Table payments {
  id uuid [pk]
  order_id uuid
  payment_method varchar
  status varchar
  paid_at timestamp
}

Table shipments {
  id uuid [pk]
  order_id uuid
  address_id uuid
  tracking_code varchar
  shipped_at timestamp
  delivered_at timestamp
}

/* Relationships */

Ref: addresses.user_id > users.id
Ref: categories.parent_id > categories.id

Ref: products.category_id > categories.id
Ref: product_variants.product_id > products.id
Ref: product_images.product_id > products.id
Ref: stock.product_variant_id > product_variants.id

Ref: orders.user_id > users.id
Ref: order_items.order_id > orders.id
Ref: order_items.product_variant_id > product_variants.id

Ref: payments.order_id > orders.id
Ref: shipments.order_id > orders.id
Ref: shipments.address_id > addresses.id
