import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, BlockUIModule],
  template: `
    <p-blockUI [blocked]="loading" styleClass="custom-blocker">
      <div class="flex flex-column align-items-center justify-content-center" style="height: 100vh;">
        <p-progressSpinner 
          styleClass="custom-spinner"
          strokeWidth="4"
          animationDuration="1s">
        </p-progressSpinner>
        <p *ngIf="message" class="text-white mt-4 text-lg font-medium">{{ message }}</p>
      </div>
    </p-blockUI>
  `,
  styles: [`
    :host ::ng-deep {
      .custom-blocker {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
      }
      
      .custom-spinner {
        width: 60px;
        height: 60px;
      }
      
      .custom-spinner .p-progress-spinner-circle {
        stroke: var(--primary-color);
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() loading = false;
  @Input() message?: string;
}
