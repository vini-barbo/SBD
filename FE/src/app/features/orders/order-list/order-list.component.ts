import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { PaginationComponent } from '../../../shared/components/pagination.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, PaginationComponent],
  template: `
    <div class="max-w-6xl mx-auto px-5 py-10">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">Meus Pedidos</h1>

      <div *ngIf="orders.length === 0" class="text-center py-20">
        <p class="text-lg text-gray-400 mb-6">Você ainda não possui pedidos</p>
        <a routerLink="/catalog" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg inline-block font-medium">
          Começar a Comprar
        </a>
      </div>

      <div *ngIf="orders.length > 0" class="space-y-4">
        <div *ngFor="let order of orders" 
             class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-sm text-gray-500">Pedido #{{ order.id }}</p>
              <p class="text-sm text-gray-600">{{ order.orderDate | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            <span [class]="getStatusClass(order.status)" 
                  class="px-4 py-1 rounded-full text-sm font-medium">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <div class="border-t pt-4 space-y-2">
            <div *ngFor="let item of order.items" class="flex justify-between text-sm">
              <span>{{ item.quantity }}x {{ item.productName }}</span>
              <span>{{ item.price * item.quantity | currency }}</span>
            </div>
          </div>

          <div class="border-t mt-4 pt-4 flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-600">Pagamento: {{ getPaymentLabel(order.paymentMethod) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Total</p>
              <p class="text-xl font-bold text-primary-500">{{ order.totalAmount | currency }}</p>
            </div>
          </div>

          <div class="mt-4">
            <a [routerLink]="['/orders', order.id]" 
               class="text-primary-500 hover:text-primary-600 font-medium">
              Ver Detalhes →
            </a>
          </div>
        </div>

        <app-pagination 
          [currentPage]="currentPage"
          [totalElements]="totalElements"
          [pageSize]="pageSize"
          (pageChange)="onPageChange($event)">
        </app-pagination>
      </div>
    </div>
  `
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  currentPage = 0;
  totalElements = 0;
  pageSize = 10;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.orders = response.content || [];
        this.totalElements = response.totalElements || 0;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'CONFIRMED': 'bg-blue-100 text-blue-800',
      'PROCESSING': 'bg-purple-100 text-purple-800',
      'SHIPPED': 'bg-indigo-100 text-indigo-800',
      'DELIVERED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'Pendente',
      'CONFIRMED': 'Confirmado',
      'PROCESSING': 'Processando',
      'SHIPPED': 'Enviado',
      'DELIVERED': 'Entregue',
      'CANCELLED': 'Cancelado'
    };
    return labels[status] || status;
  }

  getPaymentLabel(method: string): string {
    const labels: Record<string, string> = {
      'CREDIT_CARD': 'Cartão de Crédito',
      'DEBIT_CARD': 'Cartão de Débito',
      'PIX': 'PIX',
      'BANK_SLIP': 'Boleto Bancário'
    };
    return labels[method] || method;
  }
}
