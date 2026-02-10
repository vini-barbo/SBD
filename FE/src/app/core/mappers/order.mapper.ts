import { Injectable } from '@angular/core';
import { Order, OrderItem, Payment, Shipment } from '../models/order.model';
import { UserMapper } from './user.mapper';

@Injectable({ providedIn: 'root' })
export class OrderMapper {
  
  constructor(private userMapper: UserMapper) {}
  
  toModel(dto: any): Order {
    return {
      id: dto.id,
      user: dto.user ? this.userMapper.toModel(dto.user) : undefined,
      status: dto.status,
      totalAmount: dto.totalAmount,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      items: dto.items?.map((item: any) => this.toOrderItemModel(item)) || [],
      payment: dto.payment ? this.toPaymentModel(dto.payment) : undefined,
      shipment: dto.shipment ? this.toShipmentModel(dto.shipment) : undefined
    };
  }
  
  toDto(model: Order): any {
    return {
      userId: model.user?.id,
      items: model.items.map(item => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity
      })),
      addressId: model.shipment?.addressId,
      paymentMethod: model.payment?.paymentMethod
    };
  }
  
  toOrderItemModel(dto: any): OrderItem {
    return {
      id: dto.id,
      productVariantId: dto.productVariantId,
      productName: dto.productName,
      sku: dto.sku,
      quantity: dto.quantity,
      price: dto.price,
      subtotal: dto.subtotal
    };
  }
  
  toPaymentModel(dto: any): Payment {
    return {
      id: dto.id,
      paymentMethod: dto.paymentMethod,
      status: dto.status,
      paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined
    };
  }
  
  toShipmentModel(dto: any): Shipment {
    return {
      id: dto.id,
      addressId: dto.addressId,
      trackingCode: dto.trackingCode,
      shippedAt: dto.shippedAt ? new Date(dto.shippedAt) : undefined,
      deliveredAt: dto.deliveredAt ? new Date(dto.deliveredAt) : undefined
    };
  }
  
  toCreateOrderDto(cart: any, addressId: string, paymentMethod: string): any {
    return {
      userId: cart.userId,
      items: cart.items.map((item: any) => ({
        productVariantId: item.variant.id,
        quantity: item.quantity
      })),
      addressId: addressId,
      paymentMethod: paymentMethod
    };
  }

  toModelArray(dtos: any[]): Order[] {
    return dtos.map(dto => this.toModel(dto));
  }
}
