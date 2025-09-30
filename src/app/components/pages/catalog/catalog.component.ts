// import { Component, OnInit } from '@angular/core';
// import {ProductType} from "../../../../types/product.type";
// import {CartService} from "../../../services/cart.service";
// import {ActivatedRoute, Router} from "@angular/router";
//
// @Component({
//   selector: 'app-catalog',
//   templateUrl: './catalog.component.html',
//   styleUrls: ['./catalog.component.scss']
// })
// export class CatalogComponent implements OnInit {
//
//   constructor(private cartService: CartService, private router: Router) { }
//
//   products: ProductType[] = [];
//
//   ngOnInit(): void {
//
//   }
//   addToCart(title: string): void {
//     this.cartService.product = title;
//     this.router.navigate(['/order'], {queryParams: {product: title}});
//   }
//
// }
//
//
//
//


// catalog.component.ts
// import { Component, OnInit } from '@angular/core';
// import {ProductType} from "../../../../types/product.type";
// import {TeaService} from "../../../services/tea.service";
// import {CartService} from "../../../services/cart.service";
//
// @Component({
//   selector: 'app-catalog',
//   templateUrl: './catalog.component.html',
//   styleUrls: ['./catalog.component.scss']
// })
// export class CatalogComponent implements OnInit {
//   products: ProductType[] = [];
//
//   constructor(
//     private teaService: TeaService,
//     private cartService: CartService
//   ) { }
//
//   ngOnInit(): void {
//     this.teaService.getTeaProducts().subscribe({
//       next: (data: ProductType[]) => {
//         this.products = data;
//       },
//       error: (error: any) => {
//         console.error('Error loading products:', error);
//       }
//     });
//   }
//
//   addToCart(product: ProductType): void {
//     this.cartService.addToCart(product);
//   }
// }
//
//

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
export class CatalogComponent implements OnInit {
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
}













