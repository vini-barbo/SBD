import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination" *ngIf="totalPages > 1">
      <button 
        class="pagination-btn" 
        (click)="onPageChange(currentPage - 1)"
        [disabled]="currentPage === 0">
        Anterior
      </button>

      <div class="pagination-numbers">
        <button 
          *ngFor="let page of visiblePages"
          class="pagination-btn page-number"
          [class.active]="page === currentPage"
          (click)="onPageChange(page)">
          {{ page + 1 }}
        </button>
      </div>

      <button 
        class="pagination-btn" 
        (click)="onPageChange(currentPage + 1)"
        [disabled]="currentPage === totalPages - 1">
        Próxima
      </button>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 24px 0;
    }

    .pagination-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pagination-btn:hover:not(:disabled) {
      background: #f0f0f0;
      border-color: #999;
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-btn.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }

    .pagination-numbers {
      display: flex;
      gap: 4px;
    }

    .page-number {
      min-width: 40px;
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() maxVisible = 5;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    let start = Math.max(0, this.currentPage - Math.floor(this.maxVisible / 2));
    let end = Math.min(this.totalPages, start + this.maxVisible);

    if (end - start < this.maxVisible) {
      start = Math.max(0, end - this.maxVisible);
    }

    for (let i = start; i < end; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
