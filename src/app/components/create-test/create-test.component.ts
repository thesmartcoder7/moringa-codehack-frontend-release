import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions/questions.service';


@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit {
  subjectiveList: any = [];
  katasList: any = [];
  multipleChoiceList: any = [];
  assessmentList: any = [];
  kataselect!: HTMLSelectElement;
  multipleselect!: HTMLSelectElement;
  subjectiveselect!: HTMLSelectElement;

  constructor(private questions: QuestionsService) {}

  ngOnInit(): void {
    let sendInvite = document.querySelector('#sendinvite') as HTMLDivElement;
    let inviteCheckbox = document.querySelector(
      '#sendinvitecheckbox'
    ) as HTMLInputElement;
    let assesmentCheckbox = document.querySelector(
      '#createassesmentcheckbox'
    ) as HTMLInputElement;
    let createassesment = document.querySelector(
      '#createownassesment'
    ) as HTMLFormElement;
    this.kataselect = document.querySelector(
      '#katasquestions'
    ) as HTMLSelectElement;
    this.multipleselect = document.querySelector(
      '#multiplechoicequestions'
    ) as HTMLSelectElement;
    this.subjectiveselect = document.querySelector(
      '#subjectivequestions'
    ) as HTMLSelectElement;

    this.getSubjective();
    this.getkatas();
    this.getMultipleChoice();
    this.getAssessments();
  }
  getSubjective() {
    this.questions.get_subjective().subscribe((response) => {
      console.log(response);
      this.subjectiveList = response;
    });
  }

  getkatas() {
    this.questions.get_katas().subscribe((response) => {
      console.log(response);
      this.katasList = response;
    });
  }

  getMultipleChoice() {
    this.questions.get_mcquestions().subscribe((response) => {
      console.log(response);
      this.multipleChoiceList = response;
    });
  }

  getAssessments() {
    this.questions.get_assesments().subscribe((response) => {
      console.log(response);
      this.assessmentList = response;
    });
  }

  createAssessment(
    a: any,
    b: any,
    c: any,
    d: any,
    e: any,
    f: any,
    g: any,
    h: any,
    i: any
  ) {
    let selectedKatas = [];
    let selectedSubjective = [];
    let selectedMultiple = [];
    for (let option of f.options) {
      if (option.selected) {
        selectedSubjective.push(option.value);
      }
    }
    for (let option of g.options) {
      if (option.selected) {
        selectedKatas.push(option.value);
      }
    }
    for (let option of h.options) {
      if (option.selected) {
        selectedMultiple.push(option.value);
      }
    }

    let data: any = {
      name: a,
      topic: b,
      difficulty: c,
      pass_mark: Number(d),
      category: e,
      s_questions: selectedSubjective,
      kata_questions: selectedKatas,
      multiple_choice: selectedMultiple,
      time_limit: Number(i),
    };
    console.log(data.time_limit);

    this.questions.add_assessment(data).subscribe((response: any) => {
      console.log(response);
    });
  }

  changeCategory(event: any) {
    if (event.target.value == 'kata') {
      this.kataselect.style.display = 'block';
    } else {
      this.kataselect.style.display = 'none';
    }

    if (event.target.value == 'multiple_choice') {
      this.multipleselect.style.display = 'block';
    } else {
      this.multipleselect.style.display = 'none';
    }

    if (event.target.value == 'subjective') {
      this.subjectiveselect.style.display = 'block';
    } else {
      this.subjectiveselect.style.display = 'none';
    }
  }

  sendInvite(a: string, b: string, c: string) {
    let data = {
      assessment: a,
      emails: b,
      message: c,
    };
    this.questions.add_intive(data).subscribe((response: any) => {
      console.log(response);
    });
  }
}
