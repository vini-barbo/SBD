import { Address } from './address.model';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PIX' | 'BANK_SLIP';

export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  orderDate: string;
  trackingCode?: string;
}

export interface OrderItemDto {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  userId: string;
  items: OrderItemDto[];
  shippingAddressId: string;
  paymentMethod: PaymentMethod;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  trackingCode?: string;
}
