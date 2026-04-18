// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true, // Importante si no tienes AppModule
  template: `
    <button (click)="login()">Login</button>
    <button (click)="llamarApi()">Ver Mensaje Protegido</button>
  `,
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) {}

  login() {
    this.auth.login('admin', '1234').subscribe({
      next: () => alert('Logueado con éxito'),
      error: (e) => console.error('Error de login', e),
    });
  }

  llamarApi() {
    this.http.get('http://localhost:8080/api/mensaje').subscribe({
      next: (res: any) => alert('Respuesta: ' + res.texto),
      error: (e) => alert('Bloqueado por el Portero (401)'),
    });
  }
}
