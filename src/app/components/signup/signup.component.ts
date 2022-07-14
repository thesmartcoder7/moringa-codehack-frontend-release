import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  response!: any;
  message!: string;
  ngOnInit(): void {}

  submit(userName: string, userEmail: string, userPassword: string): void {
    this.http
      .post<object>(`${environment.apiBase}/register/`, {
        username: userName,
        email: userEmail,
        password: userPassword,
      })
      .subscribe((res) => {
        console.log(res);
        this.response = res;
        this.message = this.response.message;
        this.router.navigate(["/login"]);
      });
  }
}
