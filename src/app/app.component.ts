import { Component, computed, effect, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RequestPageComponent } from './pages/request-page/request-page.component';
import { HttpClientModule } from '@angular/common/http';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';
enum ButtonLabel {
  Home = 'Home',
  Jobs = 'Jobs',
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    JobsTableComponent,
    RouterOutlet,
    RequestPageComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'service-agent';
  buttonLabel: ButtonLabel = ButtonLabel.Home;
  constructor(private router: Router) {}

  navigateToPage() {
    if (this.router.url === '/jobs') {
      console.log('2');
      this.buttonLabel = ButtonLabel.Home;
      this.router.navigate(['']);
    } else {
      this.buttonLabel = ButtonLabel.Jobs;
      this.router.navigate(['/jobs']);
    }
  }
}
