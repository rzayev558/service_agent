import { Routes } from '@angular/router';
import { JobsTableComponent } from './pages/jobs-table/jobs-table.component';
import { RequestPageComponent } from './pages/request-page/request-page.component';

export const routes: Routes = [
  { path: '', component: RequestPageComponent },
  { path: 'jobs', component: JobsTableComponent },
];
