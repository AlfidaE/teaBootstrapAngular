import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  formValues = {
    name: '',
    lastName: '',
    phone: '',
    country: '',
    zip: '',
    product: '',
    address: '',
    comment: '',
  }

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    // if (this.cartService.product) {
    //   this.formValues.name = this.cartService.product;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.formValues.product = params['product'];
      }
    })
    }



  }



