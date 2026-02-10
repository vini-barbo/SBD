import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User, LoginRequest, LoginResponse, UserRequest } from '../models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private userMapper: UserMapper,
    private storageService: StorageService
  ) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const user = this.storageService.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const user = this.userMapper.toModel(response);
        const token = 'mock-token-' + Date.now();
        
        this.storageService.setToken(token);
        this.storageService.setUser(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userRequest: UserRequest): Observable<User> {
    const dto = this.userMapper.toUserRequest(userRequest);
    return this.http.post<any>(this.apiUrl, dto).pipe(
      tap(response => {
        const user = this.userMapper.toModel(response);
        // Auto-login após registro
        const token = 'mock-token-' + Date.now();
        this.storageService.setToken(token);
        this.storageService.setUser(user);
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    this.storageService.clear();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.storageService.getToken() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  getToken(): string | null {
    return this.storageService.getToken();
  }
}
