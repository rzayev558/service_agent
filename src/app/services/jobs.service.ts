import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../pages/jobs-table/jobs-table.component';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private apiUrl = 'http://localhost:3000/api/jobs';
  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}
  getRequests(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl, { headers: this.headers });
  }

  submitRequest(data: Job): Observable<any> {
    return this.http.post<Job>(this.apiUrl, data, { headers: this.headers });
  }
}
