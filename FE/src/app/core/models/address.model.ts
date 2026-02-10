export interface Address {
  id?: string;
  userId?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country?: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface AddressRequest {
  userId: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}
