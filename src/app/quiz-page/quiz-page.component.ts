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
  quizId: any;
  index: number = 0;
  constructor(
    private route: ActivatedRoute,
    private quiz_service: QuizService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => { //subscribe to query params and save id param as quizId
      this.quizId = params['id']
    });
    this.loadQuizQuestions(this.quizId) //retrieve questions for that quiz id
  }


  loadQuizQuestions(id) {
    this.quiz_service.getQuizQuestions(id).then((result) => { //get quiz questions by quiz_id so only relevant q's will be returned
      this.quizQuestions = result;
      this.index = 0;
    }).catch((err) => {
      console.log(err)
    });

  }

  changeQuestion() { //iterate through array of questions changing display each time a user clicks
    if (this.index === this.quizQuestions.length - 1) {
      this.quiz = false;
    }
    else {
      this.index++;
    }

  }
  //reset questions array
  playAgain() {
    this.index = 0;
    this.quiz = true;
  }
  //navigate home
  goHome() {
    this.router.navigateByUrl('dashboard')
  }
}
