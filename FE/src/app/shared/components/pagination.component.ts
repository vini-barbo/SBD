import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  template: `
    <p-paginator 
      *ngIf="totalElements > 0"
      [rows]="pageSize"
      [totalRecords]="totalElements"
      [first]="currentPage * pageSize"
      [rowsPerPageOptions]="[10, 20, 30, 50]"
      (onPageChange)="onPageChange($event)"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros">
    </p-paginator>
  `,
  styles: [`
    :host ::ng-deep {
      .p-paginator {
        justify-content: center;
        margin: 2rem 0;
      }
    }
  `]
})
export class PaginationComponent {
  @Input() currentPage = 0;
  @Input() totalElements = 0;
  @Input() pageSize = 10;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: PaginatorState): void {
    const newPage = Math.floor((event.first || 0) / (event.rows || this.pageSize));
    this.pageChange.emit(newPage);
  }
}
