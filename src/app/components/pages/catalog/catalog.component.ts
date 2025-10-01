import {AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductType} from "../../../../types/product.type";

declare var WOW: any;

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
          this.products = data.map(product => ({
            ...product,
            isExpanded: false
          }));
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
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }).init();
  }
}
