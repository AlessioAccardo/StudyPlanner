import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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

  constructor() {
    this.filteredEsami = this.esami; 
  }

  getInputElement(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  onSearch() {
    const query = this.searchText.toLowerCase().trim();
    if (!query) {
      this.filteredEsami = this.esami;
    } else {
      this.filteredEsami = this.esami.filter(esame =>
        esame.toLowerCase().includes(query)
      );
    }
  }
}
