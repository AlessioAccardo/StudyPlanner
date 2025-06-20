import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchText = input<string>();
  research: string = "";

  esami: string[] = [
    'INF001 - Analisi Matematica II',
    'INF002 - Programmazione Web&Mobile',
    'INF003 - Basi di Dati',
    'INF004 - Ingegneria del Software',
    'INF005 - Reti di Calcolatori'
  ];

  filteredEsami: string[] = [...this.esami];

  onSearch(): void {
    const research = this.searchText.toString()
    const text = this.research.toLowerCase().trim();
    if (!text) {
      // se la stringa di ricerca è vuota, ripristino tutti
      this.filteredEsami = [...this.esami];
    } else {
      this.filteredEsami = this.esami.filter(esame =>
        esame.toLowerCase().includes(text)
      );
    }
  }
}
