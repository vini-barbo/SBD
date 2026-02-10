import { ProductVariant } from './product.model';

export interface Cart {
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface CartItem {
  variant: ProductVariant;
  productName: string;
  imageUrl?: string;
  quantity: number;
  subtotal: number;
}
