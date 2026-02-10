import { Injectable } from '@angular/core';
import { Page } from '../models/pagination.model';

@Injectable({ providedIn: 'root' })
export class PaginationMapper {
  
  toPageModel<T>(dto: any, itemMapper: (item: any) => T): Page<T> {
    return {
      content: dto.content?.map(itemMapper) || [],
      pageable: dto.pageable || {
        pageNumber: 0,
        pageSize: 20,
        sort: { sorted: false, unsorted: true, empty: true },
        offset: 0,
        paged: true,
        unpaged: false
      },
      totalPages: dto.totalPages || 0,
      totalElements: dto.totalElements || 0,
      last: dto.last ?? true,
      first: dto.first ?? true,
      size: dto.size || 20,
      number: dto.number || 0
    };
  }
}
