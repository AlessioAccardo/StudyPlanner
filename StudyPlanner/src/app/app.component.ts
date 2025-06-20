import { Component, inject} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { AuthService} from './services/auth.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  auth = inject(AuthService);
  title = 'StudyPlanner';

}
