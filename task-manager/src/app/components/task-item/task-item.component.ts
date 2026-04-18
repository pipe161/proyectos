import { Component, input, output } from '@angular/core';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  template: `
    <li>
      {{ task().title | truncate:15 }}
      <button (click)="delete.emit(task().id)">Eliminar</button>
    </li>
  `
})
export class TaskItemComponent {
  task = input.required<Task>();
  // Nueva forma de definir eventos con signals
  delete = output<number>();
}