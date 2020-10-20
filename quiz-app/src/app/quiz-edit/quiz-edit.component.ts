import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  quizSelected: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  selectQuiz() {
    console.log('edit quiz')
  }

}
