import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ProductType} from "../catalog/catalog.component";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  product: ProductType | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.http.get<ProductType[]>('https://testologia.ru/tea')
          .subscribe({
            next: (data: ProductType[]) => {
              const foundProduct = data.find(p => p.id === +params['id']);
              if (foundProduct) {
                this.product = {
                  ...foundProduct,
                  // price: this.generateRandomPrice(300, 1500),
                  isExpanded: true // На странице товара текст всегда развернут
                };
              } else {
                this.router.navigate(['/catalog']);
              }
            },
            error: (error) => {
              this.router.navigate(['/catalog']);
            }
          });
      }
    });
  }

  private generateRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleText(product: ProductType): void {
    product.isExpanded = !product.isExpanded;
  }
}
