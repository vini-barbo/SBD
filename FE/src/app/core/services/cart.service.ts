import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { ProductVariant } from '../models/product.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly CART_KEY = 'shopping_cart';
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor(private storageService: StorageService) {
    const savedCart = this.loadCart();
    this.cartSubject = new BehaviorSubject<Cart>(savedCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  private loadCart(): Cart {
    const cart = this.storageService.getItem<Cart>(this.CART_KEY);
    return cart || { items: [], totalAmount: 0, totalItems: 0 };
  }

  private saveCart(cart: Cart): void {
    this.storageService.setItem(this.CART_KEY, cart);
    this.cartSubject.next(cart);
  }

  addItem(variant: ProductVariant, productName: string, productId: string, imageUrl?: string, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.items.find(item => item.variant.id === variant.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.variant.price;
    } else {
      const newItem: CartItem = {
        productId,
        variant,
        productName,
        imageUrl,
        quantity,
        subtotal: quantity * variant.price
      };
      cart.items.push(newItem);
    }

    this.recalculateCart(cart);
    this.saveCart(cart);
  }

  removeItem(variantId: string): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter(item => item.variant.id !== variantId);
    this.recalculateCart(cart);
    this.saveCart(cart);
  }

  updateQuantity(variantId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.items.find(item => item.variant.id === variantId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(variantId);
      } else {
        item.quantity = quantity;
        item.subtotal = item.quantity * item.variant.price;
        this.recalculateCart(cart);
        this.saveCart(cart);
      }
    }
  }

  clearCart(): void {
    const emptyCart: Cart = { items: [], totalAmount: 0, totalItems: 0 };
    this.saveCart(emptyCart);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  getItemCount(): number {
    return this.cartSubject.value.totalItems;
  }

  getTotalAmount(): number {
    return this.cartSubject.value.totalAmount;
  }

  private recalculateCart(cart: Cart): void {
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
}
