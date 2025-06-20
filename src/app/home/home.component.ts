import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchText: string = '';
  esami: string[] = [
    'INF001 - Analisi Matematica II',
    'INF002 - Programmazione Web&Mobile',
    'INF003 - Basi di Dati',
    'INF004 - Ingegneria del Software',
    'INF005 - Reti di Calcolatori'
  ];
  filteredEsami: string[] = [];

  constructor() {
    this.filteredEsami = this.esami; 
  }

  onSearch(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredEsami = this.esami.filter(esame =>
      esame.toLowerCase().includes(text)
    );
  }
}
