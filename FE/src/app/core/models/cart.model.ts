import { ProductVariant } from './product.model';

export interface Cart {
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface CartItem {
  productId: string;
  variant: ProductVariant;
  productName: string;
  imageUrl?: string;
  quantity: number;
  subtotal: number;
}
