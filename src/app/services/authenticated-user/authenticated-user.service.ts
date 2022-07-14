import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/classes/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserService {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  getUser() {
    return this.http.get<User>(
      `${environment.apiBase}/authenticated_user/`,

      { withCredentials: true }
    );
  }

  getStudentData(username: string) {
    return this.http.post(`${environment.apiBase}/student_data/`, {
      username: username,
    });
  }

  logOut() {
    return this.http.get(`${environment.apiBase}/logout/`, {
      withCredentials: true,
    });
  }
}
