import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {ProductType} from "../../types/product.type";


@Injectable({
  providedIn: 'root'
})
export class TeaService {

  private apiUrl = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  // Для каталога - БЕЗ цены
  getTeaProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.apiUrl).pipe(
      map(products => products.map(product => ({
        id: product.id,
        image: product.image,
        title: product.title,
        description: product.description
        // Цену не добавляем
      })))
    );
  }

  // Для страницы товара - С ценой
  getTeaProductById(id: number): Observable<ProductType | null> {
    return this.http.get<ProductType[]>(this.apiUrl).pipe(
      map(products => {
        const product = products.find(p => p.id === id);
        if (product) {
          return {
            ...product,
            price: this.generateRandomPrice(300, 1500) // Добавляем цену только здесь
          };
        }
        return null;
      })
    );
  }

  private generateRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
