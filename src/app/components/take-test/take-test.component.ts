import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SyntaxHighlightService } from 'src/app/services/syntax-highlight/syntax-highlight.service';
import * as ace from 'ace-builds';
import { HttpClient } from '@angular/common/http';
import { KatasService } from 'src/app/services/katas/katas.service';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.css'],
})
export class TakeTestComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  code!: string;
  output!: string;
  simpleKata!: any;
  confirmationTests!: any;
  emptyTests: boolean = true;
  allPassed!: boolean;
  countdown!: boolean;
  multiChoice!: boolean;
  kataAssessment!: boolean;
  subjectiveAssessment!: boolean;
  displayKata!: any;
  displayKataTests!:any
  displayMultiChoice!: any;
  displaySubjective!: any;
  payload!: string;

  @ViewChild('codearea') private editor!: ElementRef<HTMLElement>;

  constructor(
    private kata: KatasService,
    private highlightService: SyntaxHighlightService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private question: QuestionsService
  ) {
    this.countdown = true;
  }
  ngAfterViewChecked(): void {
    this.highlightService.highlight();
  }

  ngAfterViewInit(): void {
    this.highlightService.highlight();
    ace.config.set('fontSize', '16px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue(this.displayKata.question.starter_code);
    aceEditor.setTheme('ace/theme/tomorrow');
    aceEditor.session.setMode('ace/mode/python');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.payload = params.data;
      console.log(this.payload.split(' '));
    });
    this.question
      .get_single_question(
        this.payload.split(' ')[0],
        Number(this.payload.split(' ')[1])
      )
      .subscribe((response: any) => {
        console.log(response);
        this.displayKata = response
        this.displayKataTests = this.displayKata.tests
      });
    this.highlightService.highlight();
    this.kata.get_katas().subscribe((response: any) => {
      this.simpleKata = response[0];
    });
  }

  testCode(questionId: number) {
    const aceEditor = ace.edit(this.editor.nativeElement);
    let userCode = aceEditor.getValue();
    let payload = {
      question: questionId,
      action: 'test',
      code: userCode,
    };
    this.http
      .post('http://localhost:8000/api/run_code/', payload)
      .subscribe((response: any) => {
        this.confirmationTests = response.message;
        if (this.confirmationTests.includes('False')) {
          this.allPassed = false;
        } else {
          this.allPassed = true;
        }
      });
  }

  runCode() {
    const aceEditor = ace.edit(this.editor.nativeElement);
    let userCode = aceEditor.getValue();
    let payload = {
      code: userCode,
      action: 'run',
    };
    this.http
      .post('http://localhost:8000/api/run_code/', payload)
      .subscribe((response: any) => {
        //console.log(response);
        if (Object.keys(response).includes('output')) {
          this.output = response.output;
        }
      });
  }

  submitAssessment() {
    alert('Assessment Submitted');
  }
}
