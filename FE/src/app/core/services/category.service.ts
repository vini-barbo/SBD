import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/product.model';
import { ProductMapper } from '../mappers/product.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(
    private http: HttpClient,
    private productMapper: ProductMapper
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(dtos => dtos.map(dto => this.productMapper.toCategoryModel(dto)))
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.productMapper.toCategoryModel(dto))
    );
  }

  getCategoryTree(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tree`).pipe(
      map(dtos => dtos.map(dto => this.productMapper.toCategoryModel(dto)))
    );
  }

  createCategory(name: string, parentId?: string): Observable<Category> {
    const body = { name, parentId };
    return this.http.post<any>(this.apiUrl, body).pipe(
      map(dto => this.productMapper.toCategoryModel(dto))
    );
  }

  updateCategory(id: string, name: string, parentId?: string): Observable<Category> {
    const body = { name, parentId };
    return this.http.put<any>(`${this.apiUrl}/${id}`, body).pipe(
      map(dto => this.productMapper.toCategoryModel(dto))
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getSubcategories(parentId: string): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${parentId}/subcategories`).pipe(
      map(dtos => dtos.map(dto => this.productMapper.toCategoryModel(dto)))
    );
  }
}
