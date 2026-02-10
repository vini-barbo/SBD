export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  category?: Category;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string;
  color?: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  subcategories?: Category[];
}

export interface ProductRequest {
  name: string;
  description: string;
  basePrice: number;
  categoryId: string;
  isActive?: boolean;
}

export interface ProductVariantRequest {
  productId: string;
  size?: string;
  color?: string;
  sku: string;
  price: number;
}
