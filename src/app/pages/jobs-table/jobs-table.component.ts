import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { JobsService } from '../../services/jobs.service';

import { ButtonModule } from 'primeng/button';
import { Job } from '../../interfaces';
//have the ID optional in the frontend as mongoDB will generate it

@Component({
  selector: 'app-jobs-table',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent {
  jobs: Job[] = [];
  showFavorites = false;
  constructor(private jobsService: JobsService) {
    this.jobsService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
    });
  }

  onStarClick(job: Job) {
    if (job._id) {
      this.jobsService.addToFavorites(job._id).subscribe((res) => {
        this.jobs = this.jobs.map((j) => {
          if (j._id === job._id) {
            return { ...j, favorite: !j.favorite };
          }
          return j;
        });
      });
    }
  }

  toggleShowFavorites() {
    if (this.showFavorites) {
      this.showFavorites = false;
      this.jobsService.getJobs().subscribe((jobs) => {
        this.jobs = jobs;
      });
    } else {
      this.jobs = this.jobs.filter((job) => job.favorite);
      this.showFavorites = true;
    }
  }
}
