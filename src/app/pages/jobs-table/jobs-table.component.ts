import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { JobsService } from '../../services/jobs.service';
export interface Job {
  name: string;
  id: string;
  submissionDate: string;
  executionDate: string;
  status: string;
  header: string;
  body: string;
  method: string;
  executed?: boolean;
  api: string;
}
@Component({
  selector: 'app-jobs-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent {
  jobs: Job[] = [];
  constructor(private jobsService: JobsService) {
    this.jobsService.getRequests().subscribe((jobs) => {
      this.jobs = jobs;
      console.log('jobs', jobs);
    });
  }
}
