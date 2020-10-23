import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

ActivatedRoute
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  quiz: boolean = true;
  private sub: any;
  quizQuestions: any = [];
  quizId: number;
  index: number = 0;
  constructor(
    private route: ActivatedRoute,
    private quiz_service: QuizService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.quizId = params['id']
    });
    this.loadQuizQuestions(this.quizId)
  }


  loadQuizQuestions(id) {
    this.quiz_service.getQuizQuestions(id).then((result) => {
      this.quizQuestions = result;
      this.index = 0;
    }).catch((err) => {
      console.log(err)
    });

  }

  changeQuestion() {
    if (this.index === this.quizQuestions.length - 1) {
      this.quiz = false;
    }
    else {
      this.index++;
    }

  }

  playAgain() {
    this.index = 0;
    this.quiz = true;
  }

  goHome() {
    this.router.navigateByUrl('dashboard')
  }
}
