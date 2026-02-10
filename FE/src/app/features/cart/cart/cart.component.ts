import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Cart, CartItem } from '../../../core/models/cart.model';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="max-w-4xl mx-auto px-5 py-10">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">Carrinho de Compras</h1>

      <div *ngIf="cart.items.length === 0" class="text-center py-20">
        <p class="text-lg text-gray-400 mb-6">Seu carrinho está vazio</p>
        <a routerLink="/catalog" class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg inline-block font-medium">
          Continuar Comprando
        </a>
      </div>

      <div *ngIf="cart.items.length > 0">
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div *ngFor="let item of cart.items" class="border-b last:border-b-0 p-4 flex gap-4">
            <img [src]="item.imageUrl || '/assets/placeholder.png'" 
                 [alt]="item.productName"
                 class="w-24 h-24 object-cover rounded">
            <div class="flex-1">
              <h3 class="font-semibold text-lg mb-2">{{ item.productName }}</h3>
              <p class="text-sm text-gray-600 mb-2">SKU: {{ item.variant.sku }}</p>
              <p class="text-primary-500 font-bold">{{ item.variant.price | currency }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button (click)="updateQuantity(item.variant.id, item.quantity - 1)"
                      class="w-8 h-8 border rounded hover:bg-gray-100">-</button>
              <span class="font-semibold min-w-[40px] text-center">{{ item.quantity }}</span>
              <button (click)="updateQuantity(item.variant.id, item.quantity + 1)"
                      class="w-8 h-8 border rounded hover:bg-gray-100">+</button>
              <button (click)="removeItem(item.variant.id)"
                      class="ml-4 text-red-500 hover:text-red-700">🗑️</button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between text-xl font-bold mb-6">
            <span>Total:</span>
            <span class="text-primary-500">{{ cart.totalAmount | currency }}</span>
          </div>
          <div class="flex gap-4">
            <a routerLink="/catalog" class="flex-1 border border-gray-300 text-center py-3 rounded-lg hover:bg-gray-50">
              Continuar Comprando
            </a>
            <a routerLink="/checkout" class="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg">
              Finalizar Compra
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], totalAmount: 0, totalItems: 0 };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  updateQuantity(variantId: string, newQuantity: number): void {
    this.cartService.updateQuantity(variantId, newQuantity);
  }

  removeItem(variantId: string): void {
    this.cartService.removeItem(variantId);
  }
}
