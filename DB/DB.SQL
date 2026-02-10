CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "password_hash" text,
  "phone" varchar,
  "created_at" timestamp
);

CREATE TABLE "addresses" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "street" varchar,
  "city" varchar,
  "state" varchar,
  "country" varchar,
  "zip_code" varchar,
  "is_default" boolean
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "parent_id" uuid
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY,
  "category_id" uuid,
  "name" varchar,
  "description" text,
  "base_price" decimal,
  "is_active" boolean,
  "created_at" timestamp
);

CREATE TABLE "product_variants" (
  "id" uuid PRIMARY KEY,
  "product_id" uuid,
  "size" varchar,
  "color" varchar,
  "sku" varchar UNIQUE,
  "price" decimal
);

CREATE TABLE "product_images" (
  "id" uuid PRIMARY KEY,
  "product_id" uuid,
  "image_url" text,
  "is_primary" boolean
);

CREATE TABLE "stock" (
  "id" uuid PRIMARY KEY,
  "product_variant_id" uuid,
  "quantity" int
);

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "status" varchar,
  "total_amount" decimal,
  "created_at" timestamp
);

CREATE TABLE "order_items" (
  "id" uuid PRIMARY KEY,
  "order_id" uuid,
  "product_variant_id" uuid,
  "quantity" int,
  "price" decimal
);

CREATE TABLE "payments" (
  "id" uuid PRIMARY KEY,
  "order_id" uuid,
  "payment_method" varchar,
  "status" varchar,
  "paid_at" timestamp
);

CREATE TABLE "shipments" (
  "id" uuid PRIMARY KEY,
  "order_id" uuid,
  "address_id" uuid,
  "tracking_code" varchar,
  "shipped_at" timestamp,
  "delivered_at" timestamp
);

ALTER TABLE "addresses" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id");

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "product_variants" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "stock" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variants" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variants" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "shipments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "shipments" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");
