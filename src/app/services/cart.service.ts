// services/cart.service.ts
import { Injectable } from '@angular/core';
import {ProductType} from "../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductType[] = [];

  constructor() { }




}
