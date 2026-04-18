import { bootstrapApplication } from '@angular/platform-browser';
import { appComponent } from './app/app.component'; // Asegúrate de que esta ruta es correcta
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(appComponent, appConfig).catch((err) => console.error(err));
