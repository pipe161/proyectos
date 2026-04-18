import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div style="padding: 20px;">
      <h1>FUNCIONA</h1>
      <app-task-list></app-task-list>
    </div>
    <router-outlet />
  `
})
export class AppComponent {
}
