import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private apiUrl = 'http://localhost:3000/api/requests';
  constructor(private http: HttpClient) {}
  getRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  submitRequest(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
