import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ProductType} from "../../../../types/product.type";


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
}
