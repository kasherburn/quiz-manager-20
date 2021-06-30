import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/services/notification.service';

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
        public router: Router,
        public notification: NotificationService
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
            this.loadQuizAnswers(id, result)
            this.index = 0;
        }).catch((err) => {
            console.log(err)
        });

    }

    // load answers for quiz
    loadQuizAnswers(id, questions) {
        this.quiz_service.getQuizAnswers(id).then((result) => {
            this.quizQuestions = questions;
            this.quizQuestions.forEach(question => {
                result.forEach(answer => {
                    if (question.question_id == answer.question_id) {
                        question.answers = answer;
                        question.revealAnswer = false;
                    }
                });
            });
        }).catch((err) => {
            this.quizQuestions = questions;
            console.log(err)
            this.notification.createNotification('error', 'Permissions', 'You have limited permissions so can only view quiz questions.')

        });

    }

    revealAnswer(q) {
        this.quizQuestions.forEach(question => {
            if (question.question_id == q.question_id) {
                question.revealAnswer = true;
            }
        });
    }


}
