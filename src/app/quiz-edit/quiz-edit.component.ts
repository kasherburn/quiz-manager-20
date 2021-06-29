import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuizService } from '../../services/quiz.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-quiz-edit',
    templateUrl: './quiz-edit.component.html',
    styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {
    quizSelected: boolean = false;
    quizList: any = [];
    quizTitle: string;
    quizQuestions: any;
    selectedQuiz: string;
    newQuestion: boolean = false;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string;
    question_id: number;

    constructor(
        private quiz_service: QuizService,
        public notification: NotificationService,
        public router: Router
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
        this.selectedQuiz = quiz.quiz_id
        this.quizTitle = quiz.quiz_name;
        this.loadQuizQuestions(this.selectedQuiz)
    }
    // load quiz questions for the selected id
    loadQuizQuestions(id) {
        this.quizQuestions = null;
        this.quiz_service.getQuizQuestions(id).then((result) => {
            this.loadQuizAnswers(id, result)
        }).catch((err) => {
            console.log(err)
            this.notification.createNotification('error', 'There has been a problem,', err)

        });

    }
    // load answers for quiz
    loadQuizAnswers(id, questions) {
        this.quiz_service.getQuizAnswers(id).then((result) => {
            this.quizQuestions = questions;
            this.quizQuestions.forEach(question => {
                result.forEach(answer => {
                    if (question.question_id === answer.question_id) {
                        question.answers = answer;
                    }
                });
            });
            this.quizSelected = true;
        }).catch((err) => {
            console.log(err)
            this.notification.createNotification('error', 'There has been a problem,', err)
        });

    }
    // save changes to a question you have updated
    saveChanges(q, answer?) {
        let req;
        if (answer) {
            if (!q.answers.answer_a || !q.answers.answer_a || !q.answers.answer_c) {
                this.notification.createNotification('error', 'There has been a problem,', 'Questions must have between 3 to 5 multiple choice answers.')
                this.loadQuizQuestions(this.selectedQuiz)
                return;
            }
            req = {
                "answer_a": q.answers.answer_a,
                "answer_b": q.answers.answer_b,
                "answer_c": q.answers.answer_c,
                "answer_d": q.answers.answer_d ? q.answers.answer_d : null,
                "answer_e": q.answers.answer_e ? q.answers.answer_e : null,
                "id": q.answers['_id']
            }
            if (req) {
                this.quiz_service.updateQuizAnswer(req).then(() => {
                    this.notification.createNotification('success', 'Success!', 'Answer successfully updated!')
                    this.loadQuizQuestions(this.selectedQuiz)
                }).catch((err) => {
                    this.notification.createNotification('error', 'There has been a problem,', err)
                    console.log(err)
                });
            } else {
                this.notification.createNotification('error', 'There has been a problem,', `Please complete answer fields!`)
            }
        } else {
            if (!q.question) {
                this.notification.createNotification('error', 'There has been a problem,', 'Questions cannot be blank.')
                return;
            } else {
                req = {
                    "question": q.question,
                    "id": q['_id']
                }
                if (req && req.question) {
                    this.quiz_service.updateQuizQuestion(req).then(() => {
                        this.notification.createNotification('success', 'Success!', 'Question successfully updated!')
                        this.loadQuizQuestions(this.selectedQuiz)
                    }).catch((err) => {
                        this.notification.createNotification('error', 'There has been a problem,', err)
                        console.log(err)
                    });
                } else {
                    this.notification.createNotification('error', 'There has been a problem,', `Please complete question field!`)
                }
            }

        }

    }

    async delete(question, quiz) {
        if (!quiz) {
            const id = question.question_id;
            await this.quiz_service.deleteQuizQuestion(id).then((res) => {
                this.quiz_service.deleteQuizAnswers(id).then((res) => {
                    this.notification.createNotification('success', 'Success,', 'The selected question has been deleted')
                    this.loadQuizQuestions(this.selectedQuiz)
                }).catch((err) => {
                    console.log(err)
                    this.notification.createNotification('error', 'There has been a problem,', err)
                });
            }).catch((err) => {
                console.log(err)
                this.notification.createNotification('error', 'There has been a problem,', err)
            });
        } else {
            await this.quiz_service.deleteQuizName(this.quizTitle).then((res) => {
                if (this.quizQuestions.length === 0) {
                    this.notification.createNotification('success', 'Success,', 'The selected quiz has been deleted.')
                    this.router.navigateByUrl('quiz-edit')
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                }
                else {
                    this.quizQuestions.forEach(quiz => {
                        this.quiz_service.deleteQuizQuestion(quiz.question_id).then((res) => {
                            this.quiz_service.deleteQuizAnswers(quiz.question_id).then((res) => {
                                this.notification.createNotification('success', 'Success,', 'The selected quiz has been deleted.')
                                this.loadQuizQuestions(this.selectedQuiz)
                                this.router.navigateByUrl('quiz-edit')
                                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                                this.router.onSameUrlNavigation = 'reload';
                            }).catch((err) => {
                                console.log(err)
                                this.notification.createNotification('error', 'There has been a problem,', err)
                            });
                        }).catch((err) => {
                            console.log(err)
                            this.notification.createNotification('error', 'There has been a problem,', err)
                        });
                    });
                }

            }).catch((err) => {
                this.notification.createNotification('error', 'There has been a problem,', err)
            });
        }
    }

    addQuestion(save) {
        this.newQuestion = true;
        if (save) {
            if (!this.question || !this.answer_a || !this.answer_b || !this.answer_c && !this.newQuestion) {
                this.notification.createNotification('error', 'There has been a problem,', 'Questions must have between 3 to 5 multiple choice answers.')
                this.loadQuizQuestions(this.selectedQuiz)
                return;
            } else {
                const quizQuestion = {
                    question: this.question,
                    answer_a: this.answer_a,
                    answer_b: this.answer_b,
                    answer_c: this.answer_c,
                    answer_d: this.answer_d,
                    answer_e: this.answer_e,
                    quiz_id: this.selectedQuiz,
                    question_id: this.question_id ? this.question_id++ : this.selectedQuiz + 10
                }
                this.quiz_service.createQuizQuestion(quizQuestion).then((res) => {
                    this.notification.createNotification('Success', 'Success,', 'Your question has been successfully saved.')
                    this.question = '';
                    this.answer_a = '';
                    this.answer_b = '';
                    this.answer_c = '';
                    this.answer_d = '';
                    this.answer_e = '';
                }).catch((err) => {
                    this.notification.createNotification('error', 'There has been a problem,', err)
                });
            }
        }
    }

    home() {
        this.router.navigateByUrl('dashboard')
    }



}
