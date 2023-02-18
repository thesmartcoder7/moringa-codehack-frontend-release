import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../classes/user/user';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedUserService } from 'src/app/services/authenticated-user/authenticated-user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  message = 'Please login or signup';
  userEmail!: string;
  user!: any;
  constructor(
    private router: Router,
    private authentication: AuthenticatedUserService
  ) {}

  ngOnInit(): void {
    this.authentication.getUser().subscribe((response: User) => {
      console.log(response)
      if (response.id) {
        this.user = response;
        if (/@([a-z\S]+)/.exec(String(this.user.email))) {
          if (
            /@([a-z\S]+)/.exec(String(this.user.email))![1] ==
            'student.moringaschool.com'
          ) {
            this.router.navigate(['/student-dashboard']);
          } else {
            this.router.navigate(['/tmlanding']);
          }
        }
      }
    });
  }
}
