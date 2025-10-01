import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { timer, Subscription } from 'rxjs';
declare var WOW: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private modalTimerSubscription: Subscription | null = null;
  private bootstrapModal: bootstrap.Modal | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
     this.modalTimerSubscription = timer(10000).subscribe(() => {
      this.showModal();
    });


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

  ngOnDestroy(): void {
    if (this.modalTimerSubscription) {
      this.modalTimerSubscription.unsubscribe();
    }
    this.closeModal();
  }

  private showModal(): void {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.remove('d-none');

      // Инициализируем модальное окно с настройками для закрытия по клику вне окна
      this.bootstrapModal = new bootstrap.Modal(modalElement, {
        backdrop: true,    // разрешаем закрытие по клику на backdrop
        keyboard: true     // разрешаем закрытие по клавише ESC
      });

      this.bootstrapModal.show();

      // Обработчик для полного закрытия при скрытии
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.cleanupModal();
      });
    }
  }

  closeModal(): void {
    if (this.bootstrapModal) {
      this.bootstrapModal.hide();
    }
    this.cleanupModal();
  }

  private cleanupModal(): void {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      modalElement.classList.add('d-none');
    }

    // Удаляем backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    // Восстанавливаем скролл
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
