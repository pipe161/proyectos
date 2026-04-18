import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from './jwt.interceptor'; // Tu clase actual

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 1. Habilitamos HttpClient permitiendo interceptores basados en Inyección de Dependencias (DI)
    provideHttpClient(withInterceptorsFromDi()),
    // 2. Registramos tu interceptor de la forma tradicional
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
};
