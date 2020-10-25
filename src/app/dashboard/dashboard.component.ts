import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuizService } from '../../services/quiz.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  quizList: any = {};

  constructor(
    public router: Router,
    private quiz_service: QuizService
  ) { }

  ngOnInit() {
    this.getQuizzes()
  }

  async getQuizzes() {
    await this.quiz_service.getQuizList().then((result) => {
      this.quizList = result;
    }).catch((err) => {
      console.log(err)
    });
  }

  selectQuiz(quiz) {
    this.router.navigate(['quiz-time'], { queryParams: { 'id': quiz.quiz_id }, queryParamsHandling: 'merge' })
  }





}
