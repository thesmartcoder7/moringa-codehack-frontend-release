import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  message!: string;
  ngOnInit(): void {}

  submit(userName: string, userPassword: string): void {
    this.http
      .post<object>(
        `${environment.apiBase}/login/`,
        {
          username: userName,
          password: userPassword,
        },
        { withCredentials: true }
      )
      .subscribe((response: any) => {
        if (Object.keys(response).includes('jwt')) {
          this.message = response.message;
          console.log(this.message)
          this.router.navigate(['/landing']);
        } else {
          console.log(response);
          this.message = response.message;
        }
      });
  }
}
