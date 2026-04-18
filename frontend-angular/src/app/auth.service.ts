import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL de tu Backend (sin /app-java según tus pruebas anteriores)
  private apiUrl = '/api';
  private readonly TOKEN_KEY = 'token_jwt';

  constructor(private http: HttpClient) {}

  /**
   * Envía las credenciales al backend y guarda el token si es correcto
   */
  login(usuario: string, pass: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, pass }).pipe(
      tap((res) => {
        // Si el backend devuelve { "token": "..." }, lo guardamos
        if (res && res.token) {
          localStorage.setItem(this.TOKEN_KEY, res.token);
          console.log('Token guardado correctamente');
        }
      }),
    );
  }

  /**
   * Recupera el token del almacenamiento local para el Interceptor
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Borra el token (Cerrar sesión)
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Comprueba si el usuario está logueado (útil para el HTML)
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
