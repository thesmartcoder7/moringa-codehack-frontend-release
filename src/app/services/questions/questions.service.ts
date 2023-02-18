import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  get_mcquestions() {
    return this.http.get(`${environment.apiBase}/mcquestions/`);
  }
  get_mcanswers() {
    return this.http.get(`${environment.apiBase}/mcanswers/`);
  }
  get_subjective() {
    return this.http.get(`${environment.apiBase}/squestions/`);
  }
  get_katas() {
    return this.http.get(`${environment.apiBase}/kata/`);
  }
  get_assesments() {
    return this.http.get(`${environment.apiBase}/assessments/`);
  }

  get_single_question(category: string, id: any) {
    return this.http.post(`${environment.apiBase}/question/`, {
      category: category,
      id: id,
    });
  }

  add_intive(data: any) {
    return this.http.post(`${environment.apiBase}/add_invite/`, {
      assessment: data.assessment,
      users: data.emails,
      message: data.message,
    });
  }

  add_assessment(data: any) {
    return this.http.post<object>(`${environment.apiBase}/add_assessment/`, {
      name: data.name,
      topic: data.topic,
      difficulty: data.difficulty,
      pass_mark: data.pass_mark,
      time_limit: data.time_limit,
      category: data.category,
      s_questions: data.s_questions,
      kata_questions: data.kata_questions,
      multiple_choice: data.multiple_choice,
    });
  }
}
