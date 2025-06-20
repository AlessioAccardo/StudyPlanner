import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
  esami = [
    {
      codice: 'INF001',
      nome: 'Analisi Matematica II',
      cfu: 12,
      selezionato: false,
      note: 'Propedeutico: Analisi Matematica I'
    },
    {
      codice: 'INF002',
      nome: 'Programmazione Web & Mobile',
      cfu: 9,
      selezionato: false,
      note: 'Propedeutico: Basi di Dati'
    },
    {
      codice: 'INF003',
      nome: 'Basi di Dati',
      cfu: 6,
      selezionato: false,
      note: ''
    },
    {
      codice: 'INF004',
      nome: 'Ingegneria del Software',
      cfu: 6,
      selezionato: false,
      note: 'Propedeutico: Programmazione Web & Mobile'
    }
  ];

  get esamiSelezionati() {
    return this.esami.filter(e => e.selezionato);
  }

  get cfuTotali(): number {
    return this.esamiSelezionati.reduce((tot, e) => tot + e.cfu, 0);
  }

  salvaPiano(event: Event): void {
    event.preventDefault(); 
    alert(`Hai salvato ${this.esamiSelezionati.length} esami per un totale di ${this.cfuTotali} CFU.`);
  }
}