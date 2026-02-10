import { Injectable } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  success(message: string, duration: number = 3000): void {
    this.show({ type: 'success', message, duration });
  }

  error(message: string, duration: number = 5000): void {
    this.show({ type: 'error', message, duration });
  }

  warning(message: string, duration: number = 4000): void {
    this.show({ type: 'warning', message, duration });
  }

  info(message: string, duration: number = 3000): void {
    this.show({ type: 'info', message, duration });
  }

  private show(notification: Notification): void {
    // Implementação simples com console.log
    // Em produção, usar biblioteca como Angular Material Snackbar ou NgxToastr
    const prefix = `[${notification.type.toUpperCase()}]`;
    console.log(`${prefix} ${notification.message}`);
    
    // Adicionar notificação visual básica
    this.showBasicNotification(notification);
  }

  private showBasicNotification(notification: Notification): void {
    const container = document.createElement('div');
    container.className = `notification notification-${notification.type}`;
    container.textContent = notification.message;
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 4px;
      color: white;
      font-family: Arial, sans-serif;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      ${this.getNotificationStyles(notification.type)}
    `;

    document.body.appendChild(container);

    setTimeout(() => {
      container.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => document.body.removeChild(container), 300);
    }, notification.duration || 3000);
  }

  private getNotificationStyles(type: NotificationType): string {
    const styles: Record<NotificationType, string> = {
      success: 'background-color: #4caf50;',
      error: 'background-color: #f44336;',
      warning: 'background-color: #ff9800;',
      info: 'background-color: #2196f3;'
    };
    return styles[type];
  }
}
