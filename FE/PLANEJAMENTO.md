# 🎨 Planejamento do Frontend Angular - E-commerce SBD

**Versão:** 1.0  
**Framework:** Angular 17+  
**Data:** 09/02/2026  
**API Base:** http://localhost:8099/api

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Estrutura de Módulos](#estrutura-de-módulos)
4. [Componentes](#componentes)
5. [Serviços](#serviços)
6. [Models/Interfaces](#modelsinterfaces)
7. [Rotas](#rotas)
8. [Guards](#guards)
9. [Interceptors](#interceptors)
10. [Bibliotecas e Dependências](#bibliotecas-e-dependências)
11. [Fluxo de Dados](#fluxo-de-dados)
12. [Cronograma de Implementação](#cronograma-de-implementação)

---

## 🎯 Visão Geral

### Objetivo
Criar um e-commerce completo e moderno com Angular, consumindo a API REST SBD desenvolvida em Spring Boot.

### Funcionalidades Principais

#### Área Pública
- ✅ Listagem de produtos com filtros e busca
- ✅ Visualização detalhada de produtos
- ✅ Navegação por categorias
- ✅ Carrinho de compras
- ✅ Cadastro e login de usuários
- ✅ Checkout completo

#### Área do Cliente
- ✅ Perfil do usuário
- ✅ Gerenciamento de endereços
- ✅ Histórico de pedidos
- ✅ Rastreamento de entregas

#### Área Administrativa
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de estoque
- ✅ Gerenciamento de pedidos
- ✅ Relatórios

---

## 🏗️ Arquitetura

### Padrão Arquitetural
**Smart & Dumb Components** (Container/Presentational Pattern)

```
┌─────────────────────────────────────────────────────────┐
│                    ANGULAR APP                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Core       │  │   Shared     │  │   Features   │ │
│  │   Module     │  │   Module     │  │   Modules    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              State Management                   │   │
│  │              (Services + RxJS)                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              HTTP Interceptors                  │   │
│  │         (Auth, Error, Loading, Cache)           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
              ┌───────────────────────┐
              │    API REST (8099)    │
              │   Spring Boot 3.2.2   │
              └───────────────────────┘
```

### Organização de Pastas

```
src/
├── app/
│   ├── core/                      # Singleton services, guards, interceptors
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── admin.guard.ts
│   │   │   └── guest.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   ├── loading.interceptor.ts
│   │   │   └── cache.interceptor.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── storage.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── loading.service.ts
│   │   └── core.module.ts
│   │
│   ├── shared/                    # Shared components, directives, pipes
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── sidebar/
│   │   │   ├── breadcrumb/
│   │   │   ├── pagination/
│   │   │   ├── loading-spinner/
│   │   │   ├── product-card/
│   │   │   ├── empty-state/
│   │   │   └── confirm-dialog/
│   │   ├── directives/
│   │   │   ├── debounce-click.directive.ts
│   │   │   └── lazy-load-image.directive.ts
│   │   ├── pipes/
│   │   │   ├── currency-brl.pipe.ts
│   │   │   ├── cpf.pipe.ts
│   │   │   └── phone.pipe.ts
│   │   └── shared.module.ts
│   │
│   ├── features/                  # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── catalog/
│   │   │   ├── components/
│   │   │   │   ├── product-list/
│   │   │   │   ├── product-detail/
│   │   │   │   ├── category-menu/
│   │   │   │   └── product-filter/
│   │   │   ├── services/
│   │   │   │   ├── product.service.ts
│   │   │   │   └── category.service.ts
│   │   │   ├── catalog-routing.module.ts
│   │   │   └── catalog.module.ts
│   │   │
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   │   ├── cart-list/
│   │   │   │   ├── cart-item/
│   │   │   │   └── cart-summary/
│   │   │   ├── services/
│   │   │   │   └── cart.service.ts
│   │   │   ├── cart-routing.module.ts
│   │   │   └── cart.module.ts
│   │   │
│   │   ├── checkout/
│   │   │   ├── components/
│   │   │   │   ├── checkout-address/
│   │   │   │   ├── checkout-payment/
│   │   │   │   ├── checkout-review/
│   │   │   │   └── checkout-success/
│   │   │   ├── services/
│   │   │   │   └── order.service.ts
│   │   │   ├── checkout-routing.module.ts
│   │   │   └── checkout.module.ts
│   │   │
│   │   ├── user-profile/
│   │   │   ├── components/
│   │   │   │   ├── profile-info/
│   │   │   │   ├── profile-addresses/
│   │   │   │   ├── profile-orders/
│   │   │   │   └── order-detail/
│   │   │   ├── services/
│   │   │   │   ├── user.service.ts
│   │   │   │   └── address.service.ts
│   │   │   ├── user-profile-routing.module.ts
│   │   │   └── user-profile.module.ts
│   │   │
│   │   └── admin/
│   │       ├── components/
│   │       │   ├── dashboard/
│   │       │   ├── product-management/
│   │       │   ├── category-management/
│   │       │   ├── stock-management/
│   │       │   ├── order-management/
│   │       │   └── user-management/
│   │       ├── services/
│   │       │   ├── product-admin.service.ts
│   │       │   ├── stock.service.ts
│   │       │   └── order-admin.service.ts
│   │       ├── admin-routing.module.ts
│   │       └── admin.module.ts
│   │
│   ├── models/                    # TypeScript interfaces
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── category.model.ts
│   │   ├── order.model.ts
│   │   ├── address.model.ts
│   │   ├── cart.model.ts
│   │   └── pagination.model.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│       ├── _variables.scss
│       ├── _mixins.scss
│       └── _utilities.scss
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
└── styles.scss
```

---

## 📦 Estrutura de Módulos

### 1. Core Module (Singleton)
**Responsabilidade:** Serviços singleton, guards, interceptors

```typescript
CoreModule
├── Guards
│   ├── AuthGuard (protege rotas autenticadas)
│   ├── AdminGuard (protege rotas admin)
│   └── GuestGuard (redireciona autenticados)
├── Interceptors
│   ├── AuthInterceptor (adiciona token)
│   ├── ErrorInterceptor (trata erros HTTP)
│   ├── LoadingInterceptor (controla loading)
│   └── CacheInterceptor (cache de requisições)
└── Services
    ├── AuthService (autenticação)
    ├── StorageService (localStorage/sessionStorage)
    ├── NotificationService (toasts/alerts)
    └── LoadingService (controle de loading global)
```

### 2. Shared Module
**Responsabilidade:** Componentes, directives, pipes reutilizáveis

```typescript
SharedModule
├── Components
│   ├── HeaderComponent
│   ├── FooterComponent
│   ├── SidebarComponent
│   ├── BreadcrumbComponent
│   ├── PaginationComponent
│   ├── LoadingSpinnerComponent
│   ├── ProductCardComponent
│   ├── EmptyStateComponent
│   └── ConfirmDialogComponent
├── Directives
│   ├── DebounceClickDirective
│   └── LazyLoadImageDirective
└── Pipes
    ├── CurrencyBrlPipe
    ├── CpfPipe
    └── PhonePipe
```

### 3. Feature Modules (Lazy Loading)

#### 3.1 Auth Module
```typescript
AuthModule (lazy)
├── LoginComponent
├── RegisterComponent
└── Routes: /auth/login, /auth/register
```

#### 3.2 Catalog Module
```typescript
CatalogModule (lazy)
├── ProductListComponent
├── ProductDetailComponent
├── CategoryMenuComponent
├── ProductFilterComponent
├── ProductService
├── CategoryService
└── Routes: /products, /products/:id, /category/:id
```

#### 3.3 Cart Module
```typescript
CartModule (lazy)
├── CartListComponent
├── CartItemComponent
├── CartSummaryComponent
├── CartService
└── Routes: /cart
```

#### 3.4 Checkout Module
```typescript
CheckoutModule (lazy)
├── CheckoutAddressComponent
├── CheckoutPaymentComponent
├── CheckoutReviewComponent
├── CheckoutSuccessComponent
├── OrderService
└── Routes: /checkout, /checkout/success/:id
```

#### 3.5 User Profile Module
```typescript
UserProfileModule (lazy, protected by AuthGuard)
├── ProfileInfoComponent
├── ProfileAddressesComponent
├── ProfileOrdersComponent
├── OrderDetailComponent
├── UserService
├── AddressService
└── Routes: /profile, /profile/addresses, /profile/orders, /profile/orders/:id
```

#### 3.6 Admin Module
```typescript
AdminModule (lazy, protected by AdminGuard)
├── DashboardComponent
├── ProductManagementComponent
├── CategoryManagementComponent
├── StockManagementComponent
├── OrderManagementComponent
├── UserManagementComponent
├── ProductAdminService
├── StockService
├── OrderAdminService
└── Routes: /admin/dashboard, /admin/products, /admin/categories, etc.
```

---

## 🧩 Componentes Detalhados

### Componentes Públicos

#### 1. Header Component
**Localização:** `shared/components/header/`
- Logo e navegação principal
- Busca de produtos
- Menu de categorias
- Ícone do carrinho (com contador)
- Botões Login/Perfil
- **Dependências:** CartService, AuthService

#### 2. Product Card Component
**Localização:** `shared/components/product-card/`
- Imagem do produto
- Nome, preço, categoria
- Badge de desconto
- Botão "Adicionar ao carrinho"
- **Inputs:** product: Product
- **Outputs:** addToCart: EventEmitter

#### 3. Product List Component
**Localização:** `features/catalog/components/product-list/`
- Grid de produtos
- Filtros (categoria, preço, busca)
- Ordenação
- Paginação
- **Smart Component** (container)

#### 4. Product Detail Component
**Localização:** `features/catalog/components/product-detail/`
- Galeria de imagens
- Informações detalhadas
- Seleção de variantes (cor, tamanho)
- Quantidade
- Botão comprar
- Produtos relacionados

#### 5. Cart List Component
**Localização:** `features/cart/components/cart-list/`
- Lista de itens no carrinho
- Botões +/- quantidade
- Remover item
- Resumo de valores
- Botão finalizar compra

### Componentes Autenticados (Cliente)

#### 6. Profile Info Component
**Localização:** `features/user-profile/components/profile-info/`
- Dados do usuário
- Formulário de edição
- Alterar senha

#### 7. Profile Addresses Component
**Localização:** `features/user-profile/components/profile-addresses/`
- Lista de endereços
- Adicionar/Editar/Remover endereço
- Marcar como padrão

#### 8. Profile Orders Component
**Localização:** `features/user-profile/components/profile-orders/`
- Lista de pedidos
- Status do pedido
- Link para detalhes

#### 9. Order Detail Component
**Localização:** `features/user-profile/components/order-detail/`
- Informações completas do pedido
- Itens, valores, endereço
- Rastreamento de entrega

### Componentes Administrativos

#### 10. Dashboard Component
**Localização:** `features/admin/components/dashboard/`
- Cards de estatísticas
- Gráficos de vendas
- Pedidos recentes
- Produtos mais vendidos

#### 11. Product Management Component
**Localização:** `features/admin/components/product-management/`
- Tabela de produtos
- CRUD de produtos
- Upload de imagens
- Gerenciar variantes

#### 12. Stock Management Component
**Localização:** `features/admin/components/stock-management/`
- Tabela de estoque por variante
- Adicionar/Remover estoque
- Alertas de estoque baixo

#### 13. Order Management Component
**Localização:** `features/admin/components/order-management/`
- Tabela de pedidos
- Filtros por status
- Atualizar status
- Visualizar detalhes

---

## � Mappers

### Conceito
**Mappers** são responsáveis por transformar dados entre diferentes formatos:
- **API → Frontend**: Converter DTOs da API para modelos do Angular
- **Frontend → API**: Converter modelos do Angular para DTOs da API
- **Normalização**: Transformar strings de data, formatar valores, etc.

### Estrutura de Mappers

```
src/app/core/mappers/
├── user.mapper.ts
├── product.mapper.ts
├── category.mapper.ts
├── order.mapper.ts
├── address.mapper.ts
├── cart.mapper.ts
└── base.mapper.ts
```

### Base Mapper
**Arquivo:** `core/mappers/base.mapper.ts`

```typescript
export abstract class BaseMapper<T, D> {
  abstract toModel(dto: D): T;
  abstract toDto(model: T): D;
  
  toModelArray(dtos: D[]): T[] {
    return dtos.map(dto => this.toModel(dto));
  }
  
  toDtoArray(models: T[]): D[] {
    return models.map(model => this.toDto(model));
  }
}
```

### Mappers Específicos

#### 1. UserMapper
**Arquivo:** `core/mappers/user.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { User, UserRequest } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class UserMapper extends BaseMapper<User, any> {
  
  toModel(dto: any): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date()
    };
  }
  
  toDto(model: User): any {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      phone: model.phone,
      createdAt: model.createdAt.toISOString()
    };
  }
  
  toUserRequest(formValue: any): UserRequest {
    return {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone || null
    };
  }
}
```

#### 2. ProductMapper
**Arquivo:** `core/mappers/product.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { Product, ProductVariant, ProductImage } from '@models/product.model';
import { CategoryMapper } from './category.mapper';

@Injectable({ providedIn: 'root' })
export class ProductMapper extends BaseMapper<Product, any> {
  
  constructor(private categoryMapper: CategoryMapper) {
    super();
  }
  
  toModel(dto: any): Product {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      basePrice: dto.basePrice,
      isActive: dto.isActive,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      category: dto.category ? this.categoryMapper.toModel(dto.category) : null,
      variants: dto.variants?.map(v => this.toVariantModel(v)) || [],
      images: dto.images?.map(i => this.toImageModel(i)) || []
    };
  }
  
  toDto(model: Product): any {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      basePrice: model.basePrice,
      categoryId: model.category?.id,
      isActive: model.isActive
    };
  }
  
  toVariantModel(dto: any): ProductVariant {
    return {
      id: dto.id,
      productId: dto.productId,
      size: dto.size,
      color: dto.color,
      sku: dto.sku,
      price: dto.price,
      stockQuantity: dto.stockQuantity || 0
    };
  }
  
  toImageModel(dto: any): ProductImage {
    return {
      id: dto.id,
      productId: dto.productId,
      imageUrl: dto.imageUrl,
      isPrimary: dto.isPrimary
    };
  }
  
  toCreateDto(formValue: any): any {
    return {
      name: formValue.name,
      description: formValue.description,
      basePrice: formValue.basePrice,
      categoryId: formValue.categoryId,
      isActive: formValue.isActive ?? true
    };
  }
}
```

#### 3. CategoryMapper
**Arquivo:** `core/mappers/category.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { Category } from '@models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryMapper extends BaseMapper<Category, any> {
  
  toModel(dto: any): Category {
    return {
      id: dto.id,
      name: dto.name,
      parentId: dto.parentId,
      subcategories: dto.subcategories?.map(sub => this.toModel(sub)) || []
    };
  }
  
  toDto(model: Category): any {
    return {
      id: model.id,
      name: model.name,
      parentId: model.parentId
    };
  }
  
  toCategoryTree(dto: any): Category {
    return this.toModel(dto);
  }
}
```

#### 4. OrderMapper
**Arquivo:** `core/mappers/order.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { Order, OrderItem, Payment, Shipment } from '@models/order.model';
import { UserMapper } from './user.mapper';

@Injectable({ providedIn: 'root' })
export class OrderMapper extends BaseMapper<Order, any> {
  
  constructor(private userMapper: UserMapper) {
    super();
  }
  
  toModel(dto: any): Order {
    return {
      id: dto.id,
      user: dto.user ? this.userMapper.toModel(dto.user) : null,
      status: dto.status,
      totalAmount: dto.totalAmount,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      items: dto.items?.map(item => this.toOrderItemModel(item)) || [],
      payment: dto.payment ? this.toPaymentModel(dto.payment) : null,
      shipment: dto.shipment ? this.toShipmentModel(dto.shipment) : null
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
      paidAt: dto.paidAt ? new Date(dto.paidAt) : null
    };
  }
  
  toShipmentModel(dto: any): Shipment {
    return {
      id: dto.id,
      addressId: dto.addressId,
      trackingCode: dto.trackingCode,
      shippedAt: dto.shippedAt ? new Date(dto.shippedAt) : null,
      deliveredAt: dto.deliveredAt ? new Date(dto.deliveredAt) : null
    };
  }
  
  toCreateOrderDto(cart: any, addressId: string, paymentMethod: string): any {
    return {
      userId: cart.userId,
      items: cart.items.map(item => ({
        productVariantId: item.variant.id,
        quantity: item.quantity
      })),
      addressId: addressId,
      paymentMethod: paymentMethod
    };
  }
}
```

#### 5. AddressMapper
**Arquivo:** `core/mappers/address.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { Address } from '@models/address.model';

@Injectable({ providedIn: 'root' })
export class AddressMapper extends BaseMapper<Address, any> {
  
  toModel(dto: any): Address {
    return {
      id: dto.id,
      userId: dto.userId,
      street: dto.street,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      zipCode: dto.zipCode,
      isDefault: dto.isDefault
    };
  }
  
  toDto(model: Address): any {
    return {
      id: model.id,
      userId: model.userId,
      street: model.street,
      city: model.city,
      state: model.state,
      country: model.country,
      zipCode: model.zipCode,
      isDefault: model.isDefault
    };
  }
  
  toCreateDto(formValue: any, userId: string): any {
    return {
      userId: userId,
      street: formValue.street,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country || 'Brasil',
      zipCode: formValue.zipCode,
      isDefault: formValue.isDefault ?? false
    };
  }
}
```

#### 6. PaginationMapper
**Arquivo:** `core/mappers/pagination.mapper.ts`

```typescript
import { Injectable } from '@angular/core';
import { Page } from '@models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PaginationMapper {
  
  toPageModel<T>(dto: any, itemMapper: (item: any) => T): Page<T> {
    return {
      content: dto.content?.map(itemMapper) || [],
      pageable: dto.pageable,
      totalPages: dto.totalPages,
      totalElements: dto.totalElements,
      last: dto.last,
      first: dto.first,
      size: dto.size,
      number: dto.number
    };
  }
}
```

### Uso dos Mappers nos Serviços

#### Exemplo: ProductService com Mapper

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '@models/product.model';
import { Page } from '@models/pagination.model';
import { ProductMapper } from '@core/mappers/product.mapper';
import { PaginationMapper } from '@core/mappers/pagination.mapper';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  
  constructor(
    private http: HttpClient,
    private productMapper: ProductMapper,
    private paginationMapper: PaginationMapper
  ) {}
  
  getProducts(page = 0, size = 20, sort?: string): Observable<Page<Product>> {
    const params = { page: page.toString(), size: size.toString() };
    if (sort) params['sort'] = sort;
    
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, 
        item => this.productMapper.toModel(item)
      ))
    );
  }
  
  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.productMapper.toModel(dto))
    );
  }
  
  createProduct(product: any): Observable<Product> {
    const dto = this.productMapper.toCreateDto(product);
    return this.http.post<any>(this.apiUrl, dto).pipe(
      map(response => this.productMapper.toModel(response))
    );
  }
  
  updateProduct(id: string, product: Product): Observable<Product> {
    const dto = this.productMapper.toDto(product);
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto).pipe(
      map(response => this.productMapper.toModel(response))
    );
  }
}
```

### Benefícios dos Mappers

✅ **Separação de Responsabilidades**
- Serviços focam em lógica de negócio
- Mappers focam em transformação de dados

✅ **Reusabilidade**
- Mesma lógica de conversão em múltiplos lugares
- DRY (Don't Repeat Yourself)

✅ **Manutenibilidade**
- Mudanças na API afetam apenas os mappers
- Facilita adaptação a breaking changes

✅ **Type Safety**
- TypeScript garante tipos corretos
- Intellisense funciona perfeitamente

✅ **Testabilidade**
- Fácil criar testes unitários para mappers
- Isola lógica de transformação

### Organização no CoreModule

```typescript
// core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mappers
import { UserMapper } from './mappers/user.mapper';
import { ProductMapper } from './mappers/product.mapper';
import { CategoryMapper } from './mappers/category.mapper';
import { OrderMapper } from './mappers/order.mapper';
import { AddressMapper } from './mappers/address.mapper';
import { PaginationMapper } from './mappers/pagination.mapper';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Mappers
    UserMapper,
    ProductMapper,
    CategoryMapper,
    OrderMapper,
    AddressMapper,
    PaginationMapper
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only');
    }
  }
}
```

---

## �🔧 Serviços

### Core Services

#### 1. AuthService
**Localização:** `core/services/auth.service.ts`

```typescript
Methods:
- login(email: string, password: string): Observable<User>
- register(user: UserRequest): Observable<User>
- logout(): void
- getCurrentUser(): User | null
- isAuthenticated(): boolean
- isAdmin(): boolean
- getToken(): string | null
```

#### 2. StorageService
**Localização:** `core/services/storage.service.ts`

```typescript
Methods:
- setItem(key: string, value: any): void
- getItem(key: string): any
- removeItem(key: string): void
- clear(): void
```

#### 3. NotificationService
**Localização:** `core/services/notification.service.ts`

```typescript
Methods:
- success(message: string): void
- error(message: string): void
- warning(message: string): void
- info(message: string): void
```

### Feature Services

#### 4. ProductService
**Localização:** `features/catalog/services/product.service.ts`

```typescript
API Endpoints:
- getProducts(page, size, sort): Observable<Page<Product>>
- getActiveProducts(page, size): Observable<Page<Product>>
- getProductById(id): Observable<Product>
- searchProducts(query, page, size): Observable<Page<Product>>
- createProduct(product): Observable<Product>        // Admin
- updateProduct(id, product): Observable<Product>     // Admin
- deleteProduct(id): Observable<void>                 // Admin
```

#### 5. CategoryService
**Localização:** `features/catalog/services/category.service.ts`

```typescript
API Endpoints:
- getCategories(): Observable<Category[]>
- getRootCategories(): Observable<Category[]>
- getCategoryById(id): Observable<Category>
- createCategory(category): Observable<Category>      // Admin
- updateCategory(id, category): Observable<Category>  // Admin
- deleteCategory(id): Observable<void>                // Admin
```

#### 6. CartService
**Localização:** `features/cart/services/cart.service.ts`

```typescript
Methods (Local State):
- addToCart(product, variant, quantity): void
- removeFromCart(cartItemId): void
- updateQuantity(cartItemId, quantity): void
- clearCart(): void
- getCart(): Observable<Cart>
- getCartItemCount(): Observable<number>
- getCartTotal(): Observable<number>
```

#### 7. OrderService
**Localização:** `features/checkout/services/order.service.ts`

```typescript
API Endpoints:
- createOrder(order): Observable<Order>
- getOrders(page, size): Observable<Page<Order>>      // Admin
- getUserOrders(userId, page): Observable<Page<Order>>
- getOrderById(id): Observable<Order>
- updateOrderStatus(id, status): Observable<Order>    // Admin
```

#### 8. UserService
**Localização:** `features/user-profile/services/user.service.ts`

```typescript
API Endpoints:
- getUsers(page, size): Observable<Page<User>>        // Admin
- getUserById(id): Observable<User>
- getUserByEmail(email): Observable<User>
- updateUser(id, user): Observable<User>
- deleteUser(id): Observable<void>
```

#### 9. AddressService
**Localização:** `features/user-profile/services/address.service.ts`

```typescript
API Endpoints:
- getUserAddresses(userId): Observable<Address[]>
- getAddressById(id): Observable<Address>
- createAddress(address): Observable<Address>
- updateAddress(id, address): Observable<Address>
- deleteAddress(id): Observable<void>
```

#### 10. StockService
**Localização:** `features/admin/services/stock.service.ts`

```typescript
API Endpoints:
- getStockByVariant(variantId): Observable<Stock>
- createStock(stock): Observable<Stock>
- updateStock(id, stock): Observable<Stock>
- addStock(id, quantity): Observable<Stock>
- removeStock(id, quantity): Observable<Stock>
```

---

## 📊 Models/Interfaces

### 1. User Models
**Arquivo:** `models/user.model.ts`

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
```

### 2. Product Models
**Arquivo:** `models/product.model.ts`

```typescript
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  category: Category;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  size?: string;
  color?: string;
  sku: string;
  price: number;
  stockQuantity?: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
}
```

### 3. Category Models
**Arquivo:** `models/category.model.ts`

```typescript
export interface Category {
  id: string;
  name: string;
  parentId?: string;
  subcategories: Category[];
}
```

### 4. Order Models
**Arquivo:** `models/order.model.ts`

```typescript
export interface Order {
  id: string;
  user: User;
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
  paymentMethod: string;
  status: string;
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
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}
```

### 5. Address Models
**Arquivo:** `models/address.model.ts`

```typescript
export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}
```

### 6. Cart Models
**Arquivo:** `models/cart.model.ts`

```typescript
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  subtotal: number;
}
```

### 7. Pagination Models
**Arquivo:** `models/pagination.model.ts`

```typescript
export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
```

---

## 🛣️ Rotas

### Estrutura de Rotas

```typescript
AppRoutes
├── '' (Home/ProductList)
├── 'products'
│   └── ':id' (ProductDetail)
├── 'category/:id' (ProductList filtered)
├── 'cart' (CartList)
├── 'checkout' (CheckoutModule - lazy)
│   ├── '' (CheckoutAddress)
│   ├── 'payment' (CheckoutPayment)
│   ├── 'review' (CheckoutReview)
│   └── 'success/:orderId' (CheckoutSuccess)
├── 'auth' (AuthModule - lazy)
│   ├── 'login' (LoginComponent)
│   └── 'register' (RegisterComponent)
├── 'profile' (UserProfileModule - lazy, AuthGuard)
│   ├── '' (ProfileInfo)
│   ├── 'addresses' (ProfileAddresses)
│   ├── 'orders' (ProfileOrders)
│   └── 'orders/:id' (OrderDetail)
└── 'admin' (AdminModule - lazy, AdminGuard)
    ├── 'dashboard' (Dashboard)
    ├── 'products' (ProductManagement)
    ├── 'categories' (CategoryManagement)
    ├── 'stock' (StockManagement)
    ├── 'orders' (OrderManagement)
    └── 'users' (UserManagement)
```

---

## 🛡️ Guards

### 1. AuthGuard
**Arquivo:** `core/guards/auth.guard.ts`
- Verifica se o usuário está autenticado
- Redireciona para `/auth/login` se não estiver
- Protege rotas: `/profile/*`, `/checkout/*`, `/admin/*`

### 2. AdminGuard
**Arquivo:** `core/guards/admin.guard.ts`
- Verifica se o usuário é administrador
- Redireciona para home se não for admin
- Protege rotas: `/admin/*`

### 3. GuestGuard
**Arquivo:** `core/guards/guest.guard.ts`
- Verifica se o usuário NÃO está autenticado
- Redireciona para home se já estiver autenticado
- Protege rotas: `/auth/login`, `/auth/register`

---

## 🔌 Interceptors

### 1. AuthInterceptor
**Arquivo:** `core/interceptors/auth.interceptor.ts`
- Adiciona token JWT ao header `Authorization`
- Formato: `Bearer {token}`

### 2. ErrorInterceptor
**Arquivo:** `core/interceptors/error.interceptor.ts`
- Captura erros HTTP
- Exibe notificações amigáveis
- Trata erro 401 (logout automático)
- Trata erro 403, 404, 500

### 3. LoadingInterceptor
**Arquivo:** `core/interceptors/loading.interceptor.ts`
- Controla loading global
- Exibe spinner durante requisições

### 4. CacheInterceptor
**Arquivo:** `core/interceptors/cache.interceptor.ts`
- Cache de requisições GET
- TTL configurável
- Bypass para requisições específicas

---

## 📚 Bibliotecas e Dependências

### Core Dependencies
```json
{
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/router": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/platform-browser": "^17.0.0",
  "rxjs": "^7.8.0"
}
```

### UI Framework
```json
{
  "@angular/material": "^17.0.0",
  "@angular/cdk": "^17.0.0"
}
```
**OU**
```json
{
  "primeng": "^17.0.0",
  "primeicons": "^6.0.0"
}
```
**OU**
```json
{
  "@ng-bootstrap/ng-bootstrap": "^15.0.0",
  "bootstrap": "^5.3.0"
}
```

### Utilities
```json
{
  "ngx-toastr": "^18.0.0",           // Notifications
  "ngx-mask": "^17.0.0",             // Input masks
  "ngx-skeleton-loader": "^9.0.0",   // Skeleton loading
  "ng-image-slider": "^5.0.0",       // Image gallery
  "chart.js": "^4.0.0",              // Charts
  "ng2-charts": "^5.0.0",            // Angular wrapper for Chart.js
  "ngx-currency": "^17.0.0"          // Currency input
}
```

### Development
```json
{
  "typescript": "~5.2.0",
  "@angular/cli": "^17.0.0",
  "@angular-devkit/build-angular": "^17.0.0",
  "sass": "^1.69.0"
}
```

---

## 🔄 Fluxo de Dados

### 1. Autenticação
```
LoginComponent
    ↓ (submit)
AuthService.login()
    ↓ (HTTP POST /users/email/{email})
StorageService.setItem('token', token)
    ↓
Router.navigate(['/'])
    ↓
AuthGuard permite acesso às rotas protegidas
```

### 2. Adicionar ao Carrinho
```
ProductCard
    ↓ (click "Adicionar")
CartService.addToCart()
    ↓ (atualiza BehaviorSubject)
Header (subscriber)
    ↓ (atualiza contador do carrinho)
LocalStorage atualizado
```

### 3. Finalizar Compra
```
CartList
    ↓ (click "Finalizar Compra")
Router.navigate(['/checkout'])
    ↓
CheckoutAddress (seleciona/cria endereço)
    ↓
CheckoutPayment (seleciona método)
    ↓
CheckoutReview (confirma pedido)
    ↓
OrderService.createOrder()
    ↓ (HTTP POST /orders)
CartService.clearCart()
    ↓
Router.navigate(['/checkout/success/:orderId'])
```

### 4. Gerenciar Produtos (Admin)
```
ProductManagement
    ↓ (click "Adicionar Produto")
ProductForm (reactive form)
    ↓ (submit)
ProductAdminService.createProduct()
    ↓ (HTTP POST /products)
NotificationService.success()
    ↓
ProductList atualizada (refetch)
```

---

## 📅 Cronograma de Implementação

### Fase 1: Setup e Estrutura Base (Dia 1-2)
- [ ] Criar projeto Angular
- [ ] Configurar estrutura de pastas
- [ ] Instalar dependências
- [ ] Configurar environments
- [ ] Criar models/interfaces
- [ ] Setup CoreModule e SharedModule

### Fase 2: Autenticação (Dia 3)
- [ ] AuthService
- [ ] LoginComponent
- [ ] RegisterComponent
- [ ] AuthGuard, GuestGuard
- [ ] AuthInterceptor
- [ ] StorageService

### Fase 3: Layout e Componentes Shared (Dia 4)
- [ ] HeaderComponent
- [ ] FooterComponent
- [ ] SidebarComponent
- [ ] PaginationComponent
- [ ] LoadingSpinnerComponent
- [ ] ProductCardComponent
- [ ] Interceptors (Error, Loading)

### Fase 4: Catálogo de Produtos (Dia 5-6)
- [ ] ProductService
- [ ] CategoryService
- [ ] ProductListComponent
- [ ] ProductDetailComponent
- [ ] CategoryMenuComponent
- [ ] ProductFilterComponent

### Fase 5: Carrinho de Compras (Dia 7)
- [ ] CartService
- [ ] CartListComponent
- [ ] CartItemComponent
- [ ] CartSummaryComponent

### Fase 6: Checkout (Dia 8-9)
- [ ] OrderService
- [ ] CheckoutAddressComponent
- [ ] CheckoutPaymentComponent
- [ ] CheckoutReviewComponent
- [ ] CheckoutSuccessComponent

### Fase 7: Perfil do Usuário (Dia 10)
- [ ] UserService
- [ ] AddressService
- [ ] ProfileInfoComponent
- [ ] ProfileAddressesComponent
- [ ] ProfileOrdersComponent
- [ ] OrderDetailComponent

### Fase 8: Painel Administrativo (Dia 11-14)
- [ ] AdminGuard
- [ ] DashboardComponent
- [ ] ProductManagementComponent
- [ ] CategoryManagementComponent
- [ ] StockManagementComponent
- [ ] OrderManagementComponent
- [ ] UserManagementComponent (opcional)

### Fase 9: Testes e Refinamentos (Dia 15-16)
- [ ] Testes unitários (principais services)
- [ ] Testes E2E (fluxos críticos)
- [ ] Acessibilidade
- [ ] Responsividade
- [ ] Performance

### Fase 10: Deploy (Dia 17)
- [ ] Build de produção
- [ ] Configuração de servidor
- [ ] Deploy

---

## 🎨 Design System

### Paleta de Cores (Sugestão)
```scss
// Primary
$primary: #3f51b5;
$primary-light: #757de8;
$primary-dark: #002984;

// Secondary
$secondary: #ff4081;
$secondary-light: #ff79b0;
$secondary-dark: #c60055;

// Neutral
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-500: #6c757d;
$gray-900: #212529;

// Semantic
$success: #28a745;
$warning: #ffc107;
$error: #dc3545;
$info: #17a2b8;
```

### Typography
```scss
$font-family-base: 'Roboto', sans-serif;
$font-size-base: 16px;
$font-weight-normal: 400;
$font-weight-bold: 700;

$h1-font-size: 2.5rem;
$h2-font-size: 2rem;
$h3-font-size: 1.75rem;
$h4-font-size: 1.5rem;
```

### Spacing
```scss
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
);
```

---

## 🚀 Próximos Passos

1. **Revisar e Aprovar este Planejamento**
2. **Criar Projeto Angular**
3. **Implementar Fase por Fase**
4. **Testes Contínuos**
5. **Deploy e Monitoramento**

---

## 📝 Notas Importantes

### Segurança
⚠️ A API atual **NÃO possui autenticação real**. O frontend irá:
- Simular login (armazenar usuário no localStorage)
- Preparar estrutura para JWT quando a API for atualizada
- Implementar guards e interceptors prontos para JWT

### Performance
- Lazy loading de módulos
- OnPush change detection strategy
- Virtual scrolling para listas grandes
- Image lazy loading
- Cache de requisições GET

### Acessibilidade
- Seguir WCAG 2.1 AA
- ARIA labels
- Navegação por teclado
- Alto contraste

### SEO (Futuro)
- Angular Universal (SSR)
- Meta tags dinâmicas
- Sitemap
- Structured data

---

**Última atualização:** 09/02/2026  
**Autor:** Sistema de Planejamento  
**Versão:** 1.0
