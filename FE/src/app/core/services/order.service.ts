import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order, CreateOrderDto } from '../models/order.model';
import { Page } from '../models/pagination.model';
import { OrderMapper } from '../mappers/order.mapper';
import { PaginationMapper } from '../mappers/pagination.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(
    private http: HttpClient,
    private orderMapper: OrderMapper,
    private paginationMapper: PaginationMapper
  ) {}

  getOrders(page = 0, size = 20): Observable<Page<Order>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.orderMapper.toModel(item)))
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.orderMapper.toModel(dto))
    );
  }

  createOrder(orderRequest: CreateOrderDto): Observable<Order> {
    return this.http.post<any>(this.apiUrl, orderRequest).pipe(
      map(response => this.orderMapper.toModel(response))
    );
  }

  getOrdersByUser(userId: string, page = 0, size = 20): Observable<Page<Order>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.orderMapper.toModel(item)))
    );
  }

  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.http.patch<any>(`${this.apiUrl}/${orderId}/status`, { status }).pipe(
      map(response => this.orderMapper.toModel(response))
    );
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.http.post<any>(`${this.apiUrl}/${orderId}/cancel`, {}).pipe(
      map(response => this.orderMapper.toModel(response))
    );
  }

  getOrdersByStatus(status: string, page = 0, size = 20): Observable<Page<Order>> {
    const params = new HttpParams()
      .set('status', status)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-status`, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.orderMapper.toModel(item)))
    );
  }
}
