import { Component, OnInit } from '@angular/core';
import { AuthenticatedUserService } from 'src/app/services/authenticated-user/authenticated-user.service';

interface Assessment {
  title: string;
  language: string;
  dueDate: Date;
  timeLimit: number;
}

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css'],
})
export class AssessmentComponent implements OnInit {
  public assessments: Assessment[] = [
    {
      title: '',
      language: '',
      dueDate: new Date(),
      timeLimit: 30,
    },
  ];

  user!: any;
  userData!: any;
  constructor(private authentication: AuthenticatedUserService) {}

  ngOnInit(): void {
    this.authentication.getUser().subscribe((response) => {
      if (response.id) {
        this.user = response;
      }
      this.authentication
        .getStudentData(this.user.username)
        .subscribe((response: any) => {
          console.log(response);
          this.userData = response;
        });
    });
  }

  logOut() {
    this.authentication.logOut().subscribe((response) => {
      console.log(response);
      this.user = null;
    });
  }
}
