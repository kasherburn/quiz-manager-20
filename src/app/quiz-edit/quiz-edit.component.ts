import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
  quizSelected: boolean = false;
  quizList: any = [];
  quizTitle: string;
  quizQuestions: any = []

  constructor(
    private quiz_service: QuizService,
    public notification: NotificationService
  ) { }

  ngOnInit() {
    this.getQuizzes();
  }
  // get a list of quizzes with quiz id's
  async getQuizzes() {
    await this.quiz_service.getQuizList().then((result) => {
      this.quizList = result;
    }).catch((err) => {
      console.log(err)
    });
  }
  // select which quiz you would like to edit
  selectQuiz(quiz) {
    this.quizTitle = quiz.quiz_name;
    this.loadQuizQuestions(quiz.quiz_id)
    this.quizSelected = true;
  }
  // load quiz questions for the selected id
  loadQuizQuestions(id) {
    this.quiz_service.getQuizQuestions(id).then((result) => {
      this.quizQuestions = result;
    }).catch((err) => {
      console.log(err)
    });

  }
  // save changes to a question you have updated
  saveChanges(q) {
    const question = {
      "question": q.question,
      "answer_a": q.answer_a,
      "answer_b": q.answer_b,
      "answer_c": q.answer_c,
      "id": q['_id']
    }
    if (question.question && question.answer_a && question.answer_b && question.answer_c) {
      this.quiz_service.updateQuizQuestion(question).then(() => {
        this.notification.createNotification('success', 'Success!', 'Question successfully updated!')
      }).catch((err) => {
        this.notification.createNotification('error', 'There has been a problem,', 'Please try again!')
        console.log(err)
      });
    } else {
      this.notification.createNotification('error', 'There has been a problem,', `Please complete question and answer fields!`)
    }

  }



}
