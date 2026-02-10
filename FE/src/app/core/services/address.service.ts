import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address, AddressRequest } from '../models/address.model';
import { AddressMapper } from '../mappers/address.mapper';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private apiUrl = `${environment.apiUrl}/addresses`;

  constructor(
    private http: HttpClient,
    private addressMapper: AddressMapper
  ) {}

  getAddressesByUser(userId: string): Observable<Address[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map(dtos => this.addressMapper.toModelArray(dtos))
    );
  }

  getAddressById(id: string): Observable<Address> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(dto => this.addressMapper.toModel(dto))
    );
  }

  createAddress(addressRequest: AddressRequest): Observable<Address> {
    return this.http.post<any>(this.apiUrl, addressRequest).pipe(
      map(response => this.addressMapper.toModel(response))
    );
  }

  updateAddress(id: string, address: Address): Observable<Address> {
    const dto = this.addressMapper.toDto(address);
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto).pipe(
      map(response => this.addressMapper.toModel(response))
    );
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setDefaultAddress(id: string): Observable<Address> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/set-default`, {}).pipe(
      map(response => this.addressMapper.toModel(response))
    );
  }
}
