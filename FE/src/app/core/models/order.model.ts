import { User } from './user.model';

export interface Order {
  id: string;
  user?: User;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  items: OrderItem[];
  payment?: Payment;
  shipment?: Shipment;
}

export interface OrderItem {
  id: string;
  productVariantId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Payment {
  id: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paidAt?: Date;
}

export interface Shipment {
  id: string;
  addressId: string;
  trackingCode?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BOLETO = 'BOLETO'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface OrderRequest {
  userId: string;
  items: OrderItemRequest[];
  addressId: string;
  paymentMethod: PaymentMethod;
}

export interface OrderItemRequest {
  productVariantId: string;
  quantity: number;
}
