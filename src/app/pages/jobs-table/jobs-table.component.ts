import { JobsService } from '../../services/jobs.service';
import { Job } from '../../interfaces';
import { PrimeNgModule } from '../../primeng.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs-table',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent {
  jobs: Job[] = [];
  showFavorites = false;
  infoBoxVisible = false;
  chosenJob: Job | null = null;
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

  showDetails(job: Job) {
    this.infoBoxVisible = true;
    this.chosenJob = job;
  }
}
