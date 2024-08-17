import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.scss',
})
export class RequestPageComponent {}
