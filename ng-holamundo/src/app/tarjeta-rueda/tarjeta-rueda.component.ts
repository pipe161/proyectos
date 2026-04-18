import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tarjeta-rueda',
  standalone: true,
  styles: `
    .card {
      border: 2px solid;
      padding: 10px;
      margin: 10px;
      border-radius: 8px;
    }
    .peligro {
      color: red;
      font-weight: bold;
      animation: parpadeo 0.5s infinite;
    }
    @keyframes parpadeo {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  template: `
    <div [style.border-color]="presion() < 80 ? 'red' : 'green'" class="card">
      <h3>Rueda {{ posicion() }}</h3>
      <h2 [class.peligro]="presion() < 80">ESTADO DE LA RUEDA</h2>
      <p>
        Presión:
        <strong [style.color]="presion() < 80 ? 'red' : 'green'"> {{ presion() }} PSI </strong>
      </p>

      @if (presion() < 80) {
        <button (click)="aviso.emit()">¡PEDIR AIRE!</button>
      }
    </div>
  `,
})
export class tarjetaRuedaComponent {
  // Recibe datos del padre
  posicion = input.required<string>();
  presion = input.required<number>();

  // Envía eventos al padre
  aviso = output<void>();
}
