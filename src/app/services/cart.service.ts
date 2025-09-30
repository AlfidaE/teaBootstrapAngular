// services/cart.service.ts
import { Injectable } from '@angular/core';
import {ProductType} from "../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductType[] = [];

  constructor() { }

  addToCart(product: ProductType): void {
    this.products.push(product);
    console.log('Товар добавлен в корзину:', product.title);
  }

  getCartItems(): ProductType[] {
    return this.products;
  }

  clearCart(): void {
    this.products = [];
  }
}
