import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderMapper {
  
  toModel(dto: any): Order {
    return {
      id: dto.id,
      userId: dto.userId,
      status: dto.status,
      totalAmount: dto.totalAmount,
      orderDate: dto.orderDate || dto.createdAt,
      items: dto.items?.map((item: any) => this.toOrderItemModel(item)) || [],
      paymentMethod: dto.paymentMethod,
      shippingAddress: dto.shippingAddress,
      trackingCode: dto.trackingCode
    };
  }
  
  toDto(model: Order): any {
    return {
      userId: model.userId,
      items: model.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddressId: model.shippingAddress.id,
      paymentMethod: model.paymentMethod
    };
  }
  
  toOrderItemModel(dto: any): OrderItem {
    return {
      id: dto.id,
      productId: dto.productId,
      productName: dto.productName,
      variantId: dto.variantId,
      quantity: dto.quantity,
      price: dto.price
    };
  }

  toModelArray(dtos: any[]): Order[] {
    return dtos.map(dto => this.toModel(dto));
  }
}
