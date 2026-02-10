import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-[9999]">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
      <p *ngIf="message" class="text-white mt-4 text-base">{{ message }}</p>
    </div>
  `,
  styles: []
})
export class LoadingSpinnerComponent {
  @Input() loading = false;
  @Input() message?: string;
}
