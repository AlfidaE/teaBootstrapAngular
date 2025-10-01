import {AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var WOW: any;

export type ProductType = {
  isExpanded: boolean;
  id: number;
  image: string;
  title: string;
  description: string;
}



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, AfterViewInit {
  products: ProductType[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ProductType[]>('https://testologia.ru/tea')
      .subscribe({
        next: (data: ProductType[]) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Ошибка при загрузке товаров:', error);
        }
      });
  }
  toggleText(product: ProductType): void {
    product.isExpanded = !product.isExpanded;
  }
  ngAfterViewInit(): void {
    // Инициализируем WOW.js после полной загрузки представления
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }).init();
  }
}













