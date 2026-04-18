// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api'; // La ruta que ya probamos con curl

  constructor(private http: HttpClient) {}

  login(usuario: string, pass: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, pass }).pipe(
      tap((res) => {
        // Guardamos el token para que el interceptor lo use luego
        if (res && res.token) {
          localStorage.setItem('token_jwt', res.token);
        }
      }),
    );
  }

  getToken() {
    return localStorage.getItem('token_jwt');
  }

  logout() {
    localStorage.removeItem('token_jwt');
  }
}
