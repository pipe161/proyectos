import { Component, OnInit, signal, inject } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent,TaskFormComponent],
  template: `
    <h2>Mis Tareas</h2>
    @if (tasks().length > 0) {
      <ul>
        @for (task of tasks(); track task.id) {
            <app-task-item [task]="task" (delete)="handleDeleteTask(task.id)" />
        }
      </ul>
    } @else {
      <p>No hay tareas pendientes.</p>
    }
    <app-task-form (taskCreated)="handleAddTask($event)" />
  `
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  // Definimos la señal para el estado de la lista
  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks.set(data);
    });
  }
  // En tu TaskListComponent.ts
handleAddTask(title: string) {
  this.taskService.addTask(title).subscribe(() => {
    // Tras crear, volvemos a pedir la lista para actualizar la UI
    this.refreshTasks();
  });
}

handleDeleteTask(id: number) {
  this.taskService.deleteTask(id).subscribe(() => {
    // Tras borrar, actualizamos la lista
    this.refreshTasks();
  });
}

private refreshTasks() {
  this.taskService.getTasks().subscribe(data => {
    this.tasks.set(data);
  });
}
}