import { HttpClient } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as ace from 'ace-builds';
import { KatasService } from 'src/app/services/katas/katas.service';
import { QuestionsService } from 'src/app/services/questions/questions.service';
import { SyntaxHighlightService } from 'src/app/services/syntax-highlight/syntax-highlight.service';

@Component({
  selector: 'app-practise-test',
  templateUrl: './practise-test.component.html',
  styleUrls: ['./practise-test.component.css'],
})
export class PractiseTestComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  code!: string;
  output!: string;
  simpleKata!: any;
  simpleMCQ!: any;
  simpleMCQanswers: any[] = [];
  confirmationTests!: any;
  emptyTests: boolean = true;
  allPassed!: boolean;
  countdown!: boolean;
  mcqSubmitted=false

  @ViewChild('codearea') private editor!: ElementRef<HTMLElement>;

  constructor(
    private kata: KatasService,
    private question: QuestionsService,
    private highlightService: SyntaxHighlightService,
    private http: HttpClient
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
    aceEditor.session.setValue(this.simpleKata.starter_code);
    aceEditor.setTheme('ace/theme/tomorrow');
    aceEditor.session.setMode('ace/mode/python');
  }

  ngOnInit(): void {
    let katadiv = document.querySelector('.code-editor') as HTMLDivElement;
    let katabtn = document.querySelector('#kataque') as HTMLButtonElement;
    let mcdiv = document.querySelector('.container1') as HTMLDivElement;
    let mcbtn = document.querySelector('#mcque') as HTMLButtonElement;

    katabtn.addEventListener('click', () => {
      mcdiv.style.display = 'none';
      katadiv.style.display = 'block';
    });
    mcbtn.addEventListener('click', () => {
      katadiv.style.display = 'none';
      mcdiv.style.display = 'block';
    });

    this.highlightService.highlight();
    this.kata.get_katas().subscribe((response: any) => {
      console.log(response);
      this.simpleKata = response[0];
    });
    this.question.get_mcquestions().subscribe((response: any) => {
      console.log(response);
      this.simpleMCQ = response[0];
      this.question.get_mcanswers().subscribe((response: any) => {
        console.log(response);
        for (let answer of response) {
          if (answer.question == this.simpleMCQ.id) {
            this.simpleMCQanswers.push(answer);
          }
        }
      });
    });
  }

  changeSubmit(){
    this.mcqSubmitted = true
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
