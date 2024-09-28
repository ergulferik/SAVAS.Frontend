import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  submitForm(formData: any, options: any): Observable<any> {
    return this.http.post(`${this.API}/api/submit-form`, formData, options);
  }

  generateFormId(): Observable<any> {
    return this.http.post(`${this.API}/api/generate-id`, {});
  }
}
