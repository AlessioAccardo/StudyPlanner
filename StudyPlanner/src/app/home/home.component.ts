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
  searchText: string = "";

  esami: string[] = [
    'INF001 - Analisi Matematica II',
    'INF002 - Programmazione Web&Mobile',
    'INF003 - Basi di Dati',
    'INF004 - Ingegneria del Software',
    'INF005 - Reti di Calcolatori'
  ];

  filteredEsami: string[] = [];


  getInputElement(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value
  }

  onSearch() {
    this.filteredEsami = [];
    this.esami.forEach((esame) => {
      if (esame.toLowerCase().trim().includes(this.searchText)) {
        this.filteredEsami.push(esame);
      }
      return this.filteredEsami;
    })
  }
}
