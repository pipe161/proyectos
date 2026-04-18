import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Importar esto

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Añadir esto a los providers
  ],
};
