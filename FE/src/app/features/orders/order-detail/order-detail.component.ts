import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="max-w-4xl mx-auto px-5 py-10">
      <div *ngIf="order" class="bg-white rounded-lg shadow-md">
        <div class="p-8 border-b">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">Pedido #{{ order.id }}</h1>
              <p class="text-gray-600">Realizado em {{ order.orderDate | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            <span [class]="getStatusClass(order.status)" 
                  class="px-4 py-2 rounded-full text-sm font-medium">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold mb-2">Endereço de Entrega</h3>
              <p class="text-sm text-gray-600">{{ order.shippingAddress.street }}, {{ order.shippingAddress.number }}</p>
              <p class="text-sm text-gray-600">{{ order.shippingAddress.neighborhood }}</p>
              <p class="text-sm text-gray-600">{{ order.shippingAddress.city }} - {{ order.shippingAddress.state }}</p>
              <p class="text-sm text-gray-600">CEP: {{ order.shippingAddress.zipCode }}</p>
            </div>

            <div>
              <h3 class="font-semibold mb-2">Pagamento</h3>
              <p class="text-sm text-gray-600">{{ getPaymentLabel(order.paymentMethod) }}</p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <h3 class="font-semibold text-lg mb-4">Itens do Pedido</h3>
          <div class="space-y-4">
            <div *ngFor="let item of order.items" 
                 class="flex gap-4 p-4 border rounded-lg">
              <div class="flex-1">
                <h4 class="font-semibold">{{ item.productName }}</h4>
                <p class="text-sm text-gray-600">Quantidade: {{ item.quantity }}</p>
                <p class="text-sm text-gray-600">Preço unitário: {{ item.price | currency }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-primary-500">{{ item.price * item.quantity | currency }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8 bg-gray-50 border-t">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold">Total do Pedido</span>
            <span class="text-2xl font-bold text-primary-500">{{ order.totalAmount | currency }}</span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <a routerLink="/orders" class="text-primary-500 hover:text-primary-600 font-medium">
          ← Voltar para meus pedidos
        </a>
      </div>
    </div>
  `
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe({
        next: (order) => this.order = order
      });
    }
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
