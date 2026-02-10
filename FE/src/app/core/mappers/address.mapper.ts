import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';

@Injectable({ providedIn: 'root' })
export class AddressMapper {
  
  toModel(dto: any): Address {
    return {
      id: dto.id,
      userId: dto.userId,
      street: dto.street,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      zipCode: dto.zipCode,
      isDefault: dto.isDefault
    };
  }
  
  toDto(model: Address): any {
    return {
      id: model.id,
      userId: model.userId,
      street: model.street,
      city: model.city,
      state: model.state,
      country: model.country,
      zipCode: model.zipCode,
      isDefault: model.isDefault
    };
  }
  
  toCreateDto(formValue: any, userId: string): any {
    return {
      userId: userId,
      street: formValue.street,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country || 'Brasil',
      zipCode: formValue.zipCode,
      isDefault: formValue.isDefault ?? false
    };
  }

  toModelArray(dtos: any[]): Address[] {
    return dtos.map(dto => this.toModel(dto));
  }
}
