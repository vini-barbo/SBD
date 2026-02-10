import { Injectable } from '@angular/core';
import { Product, ProductVariant, ProductImage, Category } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductMapper {
  
  toModel(dto: any): Product {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      basePrice: dto.basePrice,
      isActive: dto.isActive,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      category: dto.category ? this.toCategoryModel(dto.category) : undefined,
      variants: dto.variants?.map((v: any) => this.toVariantModel(v)) || [],
      images: dto.images?.map((i: any) => this.toImageModel(i)) || []
    };
  }
  
  toDto(model: Product): any {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      basePrice: model.basePrice,
      categoryId: model.category?.id,
      isActive: model.isActive
    };
  }
  
  toVariantModel(dto: any): ProductVariant {
    return {
      id: dto.id,
      productId: dto.productId,
      size: dto.size,
      color: dto.color,
      sku: dto.sku,
      price: dto.price,
      stockQuantity: dto.stockQuantity || 0
    };
  }
  
  toImageModel(dto: any): ProductImage {
    return {
      id: dto.id,
      productId: dto.productId,
      imageUrl: dto.imageUrl,
      isPrimary: dto.isPrimary
    };
  }

  toCategoryModel(dto: any): Category {
    return {
      id: dto.id,
      name: dto.name,
      parentId: dto.parentId,
      subcategories: dto.subcategories?.map((s: any) => this.toCategoryModel(s)) || []
    };
  }
  
  toCreateDto(formValue: any): any {
    return {
      name: formValue.name,
      description: formValue.description,
      basePrice: formValue.basePrice,
      categoryId: formValue.categoryId,
      isActive: formValue.isActive ?? true
    };
  }

  toModelArray(dtos: any[]): Product[] {
    return dtos.map(dto => this.toModel(dto));
  }
}
