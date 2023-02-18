import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.css'],
})
export class PerformanceListComponent implements OnInit {
  assessmentList: any = [];

  constructor(private assessments: QuestionsService) {}

  ngOnInit(): void {
    console.log('hi there');
    this.getAssessments();
  }

  getAssessments() {
    this.assessments.get_assesments().subscribe((response) => {
      console.log(response);
      this.assessmentList = response;
    });
  }
}
