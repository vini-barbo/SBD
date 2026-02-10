import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  constructor(private messageService: MessageService) {}

  success(message: string, detail?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detail || message,
      life: 3000
    });
  }

  error(message: string, detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detail || message,
      life: 5000
    });
  }

  warning(message: string, detail?: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: detail || message,
      life: 4000
    });
  }

  info(message: string, detail?: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Informação',
      detail: detail || message,
      life: 3000
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}
