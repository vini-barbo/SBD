import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-2 my-6" *ngIf="totalPages > 1">
      <button 
        class="px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        (click)="onPageChange(currentPage - 1)"
        [disabled]="currentPage === 0">
        Anterior
      </button>

      <div class="flex gap-1">
        <button 
          *ngFor="let page of visiblePages"
          class="min-w-[40px] px-3 py-2 border rounded-lg transition-colors"
          [class.bg-primary-500]="page === currentPage"
          [class.text-white]="page === currentPage"
          [class.hover:bg-gray-50]="page !== currentPage"
          (click)="onPageChange(page)">
          {{ page + 1 }}
        </button>
      </div>

      <button 
        class="px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        (click)="onPageChange(currentPage + 1)"
        [disabled]="currentPage === totalPages - 1">
        Próxima
      </button>
    </div>
  `,
  styles: []
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
