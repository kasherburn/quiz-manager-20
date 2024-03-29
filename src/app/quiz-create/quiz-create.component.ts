import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-quiz-create',
    templateUrl: './quiz-create.component.html',
    styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent implements OnInit {
    title: boolean = true;
    quizTitle: string;
    quiz_id: number;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string;
    question_id: number = 0;
    questionNumber: number = 1;

    constructor(
        private quiz_service: QuizService,
        public notification: NotificationService,
        public router: Router
    ) { }

    async ngOnInit() {
        await this.quiz_service.getQuizList().then((result) => {
            this.quiz_id = result[result.length - 1].quiz_id + 1;
        }).catch((err) => {
            console.log(err)
        });
    }

    next(type) {
        if (!this.quizTitle) {
            return;
        }
        if (type === 'title') {
            const req = {
                "quiz_name": this.quizTitle,
                "quiz_id": this.quiz_id

            }
            this.quiz_service.createQuizTitle(req).then((result) => {
                this.title = false;
            }).catch((err) => {
                this.notification.createNotification('error', 'There has been a problem,', err)
            });
        } else {
            if (!this.question || !this.answer_a || !this.answer_c || !this.answer_b) {
                this.notification.createNotification('error', 'There has been a problem,', 'Questions are required to have between 3 to 5 multiple choice answers.')
                return;
            }
            const quizQuestion = {
                question: this.question,
                answer_a: this.answer_a,
                answer_b: this.answer_b,
                answer_c: this.answer_c,
                answer_d: this.answer_d,
                answer_e: this.answer_e,
                quiz_id: this.quiz_id,
                question_id: uuidv4()
            }
            this.quiz_service.createQuizQuestion(quizQuestion).then((res) => {
                this.notification.createNotification('Success', 'Success,', 'Your question has been successfully saved.')
                this.question = '';
                this.answer_a = '';
                this.answer_b = '';
                this.answer_c = '';
                this.answer_d = '';
                this.answer_e = '';
                this.questionNumber++;
            }).catch((err) => {
                this.notification.createNotification('error', 'There has been a problem,', err)
            });
        }
    }

    finish() {
        this.router.navigateByUrl('dashboard')
    }

}
