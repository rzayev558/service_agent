import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Job } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private apiUrl = 'http://localhost:3000/api/jobs';
  private headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl, { headers: this.headers });
  }

  submitRequest(data: Job): Observable<any> {
    return this.http.post<Job>(this.apiUrl, data, { headers: this.headers });
  }

  addToFavorites(jobId: string): Observable<any> {
    console.log('jobId', jobId);
    return this.http.patch<Job>(
      `${this.apiUrl}/${jobId}`,
      {},
      { headers: this.headers }
    );
  }
}
