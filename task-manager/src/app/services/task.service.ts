import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task { id: number; title: string; completed: boolean; }

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  // Método para crear (POST)
  addTask(title: string): Observable<Task> {
    const newTask = { title, completed: false };
    return this.http.post<Task>(this.url, newTask);
  }

  // Método para borrar (DELETE)
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}