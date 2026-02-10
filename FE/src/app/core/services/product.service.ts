import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductRequest } from '../models/product.model';
import { Page } from '../models/pagination.model';
import { ProductMapper } from '../mappers/product.mapper';
import { PaginationMapper } from '../mappers/pagination.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    private productMapper: ProductMapper,
    private paginationMapper: PaginationMapper
  ) {}

  getProducts(page = 0, size = 20, sort?: string, search?: string): Observable<Page<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (sort) params = params.set('sort', sort);
    if (search) params = params.set('search', search);

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.productMapper.toModel(item)))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.productMapper.toModel(dto))
    );
  }

  createProduct(product: ProductRequest): Observable<Product> {
    const dto = this.productMapper.toCreateDto(product);
    return this.http.post<any>(this.apiUrl, dto).pipe(
      map(response => this.productMapper.toModel(response))
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const dto = this.productMapper.toDto(product);
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto).pipe(
      map(response => this.productMapper.toModel(response))
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(categoryId: string, page = 0, size = 20): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('categoryId', categoryId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/by-category`, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.productMapper.toModel(item)))
    );
  }

  searchProducts(query: string, page = 0, size = 20): Observable<Page<Product>> {
    const params = new HttpParams()
      .set('search', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      map(dto => this.paginationMapper.toPageModel(dto, item => this.productMapper.toModel(item)))
    );
  }
}
