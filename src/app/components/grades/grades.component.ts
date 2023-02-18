import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  assessmentList:any = [];
  

  constructor(private assessments: QuestionsService ) { 
    
  }

  ngOnInit(): void {
    this.getAssessments()
  }

  getAssessments(){
    this.assessments.get_assesments().subscribe(response =>{
      console.log(response)
      this.assessmentList=response
    })
  }

}
