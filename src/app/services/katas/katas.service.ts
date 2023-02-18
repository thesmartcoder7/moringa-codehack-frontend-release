import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KatasService {
  studentAssessment!: any;

  constructor(private http: HttpClient) {}

  get_katas() {
    return this.http.get('http://localhost:8000/api/kata/');
  }
}
