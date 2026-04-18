import { Component, signal } from '@angular/core';
import { tarjetaRuedaComponent } from './tarjeta-rueda/tarjeta-rueda.component';
import { FormsModule } from '@angular/forms'; // <--- Importa esto

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [tarjetaRuedaComponent, FormsModule], // Asegúrate de que esto esté aunque esté vacío
  template: `
    <h1>Bike Dashboard Pro 2026</h1>

    <div style="margin-bottom: 20px; border: 1px dashed #ccc; padding: 10px;">
      <label>Nombre de la bici: </label>
      <input [ngModel]="nombreBici()" (ngModelChange)="nombreBici.set($event)" />

      <p>
        Estás configurando la: <strong>{{ nombreBici() }}</strong>
      </p>
    </div>

    <div style="display: flex;">
      <app-tarjeta-rueda
        posicion="Delantera"
        [presion]="pDelantera()"
        (aviso)="logMantenimiento('Inflar delantera')"
      >
      </app-tarjeta-rueda>

      <app-tarjeta-rueda
        posicion="Trasera"
        [presion]="pTrasera()"
        (aviso)="logMantenimiento('Inflar trasera')"
      >
      </app-tarjeta-rueda>
    </div>

    <h3>Historial de baches/mantenimiento:</h3>
    <ul>
      @for (item of historial(); track $index) {
        <li>{{ item }}</li>
      } @empty {
        <li>Todo en orden en la ciudad.</li>
      }
    </ul>

    <button (click)="pillarBache()">¡Bache!</button>

    <button (click)="limpiarCarretera()">Limpiar carretera</button>
  `,
})
export class appComponent {
  nombreBici = signal('Rayito');
  pDelantera = signal(0); // Empieza baja para ver el botón
  pTrasera = signal(0);
  historial = signal<string[]>([]);

  logMantenimiento(msg: string) {
    const avisoCompleto = `${this.nombreBici().toUpperCase()}: ${msg} a las ${new Date().toLocaleTimeString()}`;
    this.historial.update((h) => [avisoCompleto, ...h]);
    // Simulamos que al pedir aire, sube la presión
    if (msg.includes('delantera')) this.pDelantera.update((x) => x + 5);
    if (msg.includes('trasera')) this.pTrasera.update((x) => x + 2);
  }
  pillarBache() {
    this.pDelantera.update((p) => p - 20); // Bajamos 20 PSI de golpe
  }

  limpiarCarretera() {
    this.historial.set([]);
  }
}
