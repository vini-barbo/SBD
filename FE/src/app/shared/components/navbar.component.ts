import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, BadgeModule, AvatarModule, ButtonModule],
  template: `
    <p-menubar [model]="items" styleClass="sticky top-0 z-50">
      <ng-template pTemplate="start">
        <a routerLink="/" class="text-2xl font-bold text-primary no-underline">
          <i class="pi pi-shopping-bag mr-2"></i>SBD Store
        </a>
      </ng-template>
      
      <ng-template pTemplate="end">
        <div class="flex align-items-center gap-3">
          <a routerLink="/cart" class="p-button p-button-text p-button-plain relative" pButton>
            <i class="pi pi-shopping-cart text-xl" [pBadge]="cartItemCount > 0 ? cartItemCount.toString() : ''" badgeSeverity="danger"></i>
          </a>
          
          <ng-container *ngIf="isAuthenticated; else guestButtons">
            <p-avatar icon="pi pi-user" shape="circle" styleClass="cursor-pointer" (click)="goToProfile()"></p-avatar>
            <p-button label="Sair" icon="pi pi-sign-out" (onClick)="logout()" severity="secondary" [outlined]="true"></p-button>
          </ng-container>
          
          <ng-template #guestButtons>
            <p-button label="Entrar" icon="pi pi-sign-in" routerLink="/auth/login" [outlined]="true" severity="secondary"></p-button>
            <p-button label="Cadastrar" icon="pi pi-user-plus" routerLink="/auth/register"></p-button>
          </ng-template>
        </div>
      </ng-template>
    </p-menubar>
  `,
  styles: [`
    :host ::ng-deep {
      .p-menubar {
        border-radius: 0;
        border-left: none;
        border-right: none;
        border-top: none;
      }
      
      .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
        padding: 0.75rem 1rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

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
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildMenu();
  }

  buildMenu(): void {
    this.items = [
      {
        label: 'Produtos',
        icon: 'pi pi-th-large',
        routerLink: '/catalog'
      }
    ];

    if (this.isAuthenticated) {
      this.items.push(
        {
          label: 'Meus Pedidos',
          icon: 'pi pi-list',
          routerLink: '/orders'
        },
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          routerLink: '/profile'
        }
      );

      if (this.isAdmin) {
        this.items.push({
          label: 'Admin',
          icon: 'pi pi-cog',
          routerLink: '/admin'
        });
      }
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
