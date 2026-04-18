import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="addTask()">
      <input formControlName="title" placeholder="Nueva tarea...">
      <button type="submit" [disabled]="taskForm.invalid">Agregar</button>
    </form>
  `
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  taskCreated = output<string>(); // Evento para avisar al padre

  taskForm = this.fb.group({
    title: ['', Validators.required]
  });

  addTask() {
    if (this.taskForm.valid) {
      this.taskCreated.emit(this.taskForm.value.title!);
      this.taskForm.reset();
    }
  }
}