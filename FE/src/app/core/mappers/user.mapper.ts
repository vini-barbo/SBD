import { Injectable } from '@angular/core';
import { User, UserRequest } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserMapper {
  
  toModel(dto: any): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      role: dto.role || 'USER'
    };
  }
  
  toDto(model: User): any {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
      phone: model.phone,
      createdAt: model.createdAt.toISOString()
    };
  }
  
  toUserRequest(formValue: any): UserRequest {
    return {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone || null
    };
  }

  toModelArray(dtos: any[]): User[] {
    return dtos.map(dto => this.toModel(dto));
  }
}
