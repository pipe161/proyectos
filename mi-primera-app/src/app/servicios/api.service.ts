import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // La URL de tu servidor Node.js
  private readonly URL_API = 'http://localhost:3000/api/files';
  private readonly URL_DOCS = 'http://localhost:3000/docs';

  constructor(private http: HttpClient) {}

  // 1. Obtener la lista de nombres de archivos (.json)
  getListaArchivos(): Observable<string[]> {
    return this.http.get<string[]>(this.URL_API);
  }

  // 2. Obtener el contenido de un archivo específico
  getContenidoArchivo(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_DOCS}/${nombre}`);
  }
}
