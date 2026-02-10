import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-5 py-4">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-primary-500">SBD Store</a>
          
          <div class="flex gap-6 items-center">
            <a routerLink="/catalog" routerLinkActive="text-primary-500" class="font-medium text-gray-700 hover:text-primary-500 transition-colors">Produtos</a>
            <a routerLink="/cart" class="relative font-medium text-gray-700 hover:text-primary-500 transition-colors">
              🛒 Carrinho
              <span *ngIf="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                {{ cartItemCount }}
              </span>
            </a>
            
            <div *ngIf="isAuthenticated; else guestLinks" class="flex gap-6 items-center">
              <a routerLink="/orders" routerLinkActive="text-primary-500" class="font-medium text-gray-700 hover:text-primary-500 transition-colors">Meus Pedidos</a>
              <a routerLink="/profile" routerLinkActive="text-primary-500" class="font-medium text-gray-700 hover:text-primary-500 transition-colors">Perfil</a>
              <a *ngIf="isAdmin" routerLink="/admin" routerLinkActive="text-primary-500" class="font-medium text-gray-700 hover:text-primary-500 transition-colors">Admin</a>
              <button (click)="logout()" class="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Sair</button>
            </div>
            
            <ng-template #guestLinks>
              <a routerLink="/auth/login" routerLinkActive="text-primary-500" class="font-medium text-gray-700 hover:text-primary-500 transition-colors">Entrar</a>
              <a routerLink="/auth/register" class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Cadastrar</a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get cartItemCount(): number {
    return this.cartService.getItemCount();
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}
