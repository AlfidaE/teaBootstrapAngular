import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  showSuccess: boolean = false;
  showError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(6)]],
      product: [{value: '', disabled: true}, Validators.required],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-Я0-9\\s\\-/]+$')]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.patchValue({
          product: params['product']
        });
      }
    });
  }

  onAddressInput(event: any) {
    let value = event.target.value;
    // Удаляем все символы кроме разрешенных: буквы, цифры, пробелы, дефис, слеш
    value = value.replace(/[^a-zA-Zа-яА-Я0-9\s\-/]/g, '');

    // Обновляем значение в форме
    this.orderForm.patchValue({
      address: value
    });
  }

  // Получение ошибок для отображения
  getFieldError(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Это поле обязательно';
      if (field.errors['pattern']) {
        switch(fieldName) {
          case 'name':
          case 'last_name':
            return 'Можно вводить только буквы';
          case 'phone':
            return 'Формат: +79991234567 или 79991234567 (11 цифр)';
          case 'address':
            return 'Можно вводить только буквы, цифры, пробелы, дефис (-) и слеш (/)';
          default:
            return 'Неверный формат';
        }
      }
      if (field.errors['minlength']) {
        if (fieldName === 'zip') return 'Индекс должен содержать минимум 6 цифр';
      }
    }
    return '';
  }

  sendOrder() {
    if (this.orderForm.invalid) {
      // Помечаем все поля как touched для показа ошибок
      Object.keys(this.orderForm.controls).forEach(key => {
        this.orderForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.showError = false;

    // Подготавливаем данные для отправки
    const formData = {
      ...this.orderForm.getRawValue(), // getRawValue() чтобы получить disabled поля
      comment: this.orderForm.get('comment')?.value || ''
    };

    this.http.post<{success: number}>('https://testologia.ru/order-tea', formData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success === 1) {
            this.showSuccess = true;
          } else {
            this.showError = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.showError = true;
          console.error('Ошибка при отправке заказа:', error);
        }
      });
  }
}
