import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

type ResponseType = 'blob' | 'json'

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Bilinmeyen bir hata oluştu';
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side hata:', error.error.message);
      errorMessage = `Client-side hata: ${error.error.message}`;
    } else {
      console.error(`Server-side hata: ${error.status}, hata mesajı: ${error.message}`);
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        if (error.status === 404) {
          errorMessage = 'İstenen veri bulunamadı (404)';
        } else if (error.status === 500) {
          errorMessage = 'Sunucu hatası oluştu (500)';
        } else {
          errorMessage = `Sunucu hatası: ${error.message}`;
        }
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Hata',
      text: errorMessage,
      confirmButtonText: 'Tamam'
    });

    return throwError(() => new Error(errorMessage));
  }

  submitForm(formData: any, options: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/submit-form`, formData, options).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  generateFormId(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/generate-id`, {}).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getDataSource(endpoint: string, month?: number, year?: number): Observable<any> {
    let params = new HttpParams();
    if (month) {
      params = params.set('month', month.toString());
    }
    if (year) {
      params = params.set('year', year.toString());
    }

    return this.http.get<any>(`${this.apiUrl}${endpoint}`, { params }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  addDataBlob(endpoint: string, data: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { responseType: 'blob' }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  addDataJson(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { responseType: 'json' }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  removeData(endpoint: string, id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${endpoint}/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateData(endpoint: string, id: any, data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${endpoint}/${id}`, data).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
