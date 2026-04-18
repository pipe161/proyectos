import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';
      
      if (error.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.status === 0) {
        errorMessage = 'No se pudo conectar con el servidor (¿Está el json-server encendido?)';
      }

      console.error('Error capturado por el interceptor:', errorMessage);
      alert(errorMessage); // Para este ejemplo, una alerta es suficiente
      
      return throwError(() => new Error(errorMessage));
    })
  );
};