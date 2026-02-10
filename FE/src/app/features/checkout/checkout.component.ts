import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AddressService } from '../../../core/services/address.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Address } from '../../../core/models/address.model';
import { Cart } from '../../../core/models/cart.model';
import { CreateOrderDto, OrderItemDto, PaymentMethod } from '../../../core/models/order.model';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CurrencyPipe],
  template: `
    <div class="max-w-6xl mx-auto px-5 py-10">
      <h1 class="text-4xl font-bold mb-8 text-gray-800">Finalizar Compra</h1>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <!-- STEP 1: Endereço -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-bold mb-4">1. Endereço de Entrega</h2>
            
            <div *ngIf="addresses.length > 0" class="mb-4">
              <div *ngFor="let addr of addresses" 
                   (click)="selectAddress(addr)"
                   [class.border-primary-500]="selectedAddress?.id === addr.id"
                   class="border-2 p-4 rounded-lg mb-3 cursor-pointer hover:border-primary-300">
                <p class="font-semibold">{{ addr.street }}, {{ addr.number }}</p>
                <p class="text-sm text-gray-600">{{ addr.city }} - {{ addr.state }}, {{ addr.zipCode }}</p>
              </div>
            </div>

            <button (click)="showAddressForm = !showAddressForm" 
                    class="text-primary-500 hover:text-primary-600 font-medium">
              + Adicionar novo endereço
            </button>

            <form *ngIf="showAddressForm" [formGroup]="addressForm" class="mt-4 space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <input formControlName="zipCode" placeholder="CEP" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="street" placeholder="Rua" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="number" placeholder="Número" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="complement" placeholder="Complemento" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="neighborhood" placeholder="Bairro" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="city" placeholder="Cidade" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <input formControlName="state" placeholder="Estado" 
                       class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <button type="button" (click)="saveAddress()" 
                      class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg">
                Salvar Endereço
              </button>
            </form>
          </div>

          <!-- STEP 2: Pagamento -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-4">2. Forma de Pagamento</h2>
            <div class="space-y-3">
              <label *ngFor="let method of paymentMethods" 
                     class="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" [value]="method.value" [(ngModel)]="selectedPaymentMethod" 
                       name="payment" class="w-5 h-5">
                <span>{{ method.label }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- RESUMO DO PEDIDO -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-2xl font-bold mb-6">Resumo do Pedido</h2>
            
            <div class="space-y-3 mb-6">
              <div *ngFor="let item of cart.items" class="flex justify-between text-sm">
                <span>{{ item.quantity }}x {{ item.productName }}</span>
                <span>{{ item.variant.price * item.quantity | currency }}</span>
              </div>
            </div>

            <div class="border-t pt-4 mb-6">
              <div class="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span class="text-primary-500">{{ cart.totalAmount | currency }}</span>
              </div>
            </div>

            <button (click)="placeOrder()" 
                    [disabled]="!selectedAddress || !selectedPaymentMethod"
                    class="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cart: Cart = { items: [], totalAmount: 0, totalItems: 0 };
  addresses: Address[] = [];
  selectedAddress: Address | null = null;
  selectedPaymentMethod: PaymentMethod | null = null;
  showAddressForm = false;

  addressForm: FormGroup;
  
  paymentMethods = [
    { value: 'CREDIT_CARD' as PaymentMethod, label: '💳 Cartão de Crédito' },
    { value: 'DEBIT_CARD' as PaymentMethod, label: '💳 Cartão de Débito' },
    { value: 'PIX' as PaymentMethod, label: '📱 PIX' },
    { value: 'BANK_SLIP' as PaymentMethod, label: '🧾 Boleto Bancário' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
    this.loadAddresses();
  }

  loadAddresses(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.addressService.getUserAddresses(userId).subscribe({
        next: (addresses) => {
          this.addresses = addresses;
          if (addresses.length > 0) {
            this.selectedAddress = addresses[0];
          }
        }
      });
    }
  }

  selectAddress(address: Address): void {
    this.selectedAddress = address;
  }

  saveAddress(): void {
    if (this.addressForm.valid) {
      const userId = this.authService.getCurrentUser()?.id;
      if (userId) {
        this.addressService.createAddress({ ...this.addressForm.value, userId }).subscribe({
          next: (address) => {
            this.addresses.push(address);
            this.selectedAddress = address;
            this.showAddressForm = false;
            this.addressForm.reset();
          }
        });
      }
    }
  }

  placeOrder(): void {
    if (!this.selectedAddress || !this.selectedPaymentMethod) return;

    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return;

    const orderItems: OrderItemDto[] = this.cart.items.map(item => ({
      productId: item.productId,
      variantId: item.variant.id,
      quantity: item.quantity,
      price: item.variant.price
    }));

    const orderDto: CreateOrderDto = {
      userId,
      items: orderItems,
      shippingAddressId: this.selectedAddress.id!,
      paymentMethod: this.selectedPaymentMethod
    };

    this.orderService.createOrder(orderDto).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/orders', order.id]);
      }
    });
  }
}
