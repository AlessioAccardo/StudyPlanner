import { Component} from '@angular/core';
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
      note: ''
    },
    {
      codice: 'INF003',
      nome: 'Basi di Dati',
      cfu: 6,
      selezionato: false,
      note: 'Propedeutico: Basi di Dati'
    },
    {
      codice: 'INF004',
      nome: 'Ingegneria del Software',
      cfu: 6,
      selezionato: false,
      note: 'Propedeutico: Programmazione Web & Mobile'
    }
  ];
  searchText: string = '';
  
  constructor() {
    setTimeout(() => this.aggiornaRicerca(), 0);
  }

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

  aggiornaRicerca(): void {
    const filtro = (document.getElementById('search') as HTMLInputElement)?.value.toLowerCase();
    const container = document.getElementById('lista-esami');
    if (!container) return;

    container.innerHTML = '';

    this.esami.forEach((esame, index) => {
      const testo = (esame.codice + ' ' + esame.nome).toLowerCase();
      if (testo.includes(filtro)) {
        const div = document.createElement('div');
        div.classList.add('course');

        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = esame.selezionato;

        checkbox.addEventListener('change', () => {
          this.esami[index].selezionato = checkbox.checked;
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${esame.codice} - ${esame.nome} (${esame.cfu} CFU)`));
        div.appendChild(label);

        if (esame.note) {
          const note = document.createElement('p');
          note.classList.add('note');
          note.textContent = esame.note;
          div.appendChild(note);
        }

        container.appendChild(div);
      }
    });
  }
}
