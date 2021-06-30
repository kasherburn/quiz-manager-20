import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(
        private http: HttpClient
    ) { }


    // get quiz list
    public getQuizList(): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = 'http://localhost:3000/quiz-list';
            return this.http.get(url, { withCredentials: true })
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    // get quiz questions based on quiz id
    public getQuizQuestions(id): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/questions/${id}`;
            return this.http.get(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    // get quiz answers based on quiz id
    public getQuizAnswers(id): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/answers/${id}`;
            return this.http.get(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    // update quiz questions
    public updateQuizQuestion(question): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/update-question`;
            return this.http.put(url, question)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    // update quiz questions
    public updateQuizAnswer(answer): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/update-answer`;
            return this.http.put(url, answer)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    // delete quiz name
    public deleteQuizName(name): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/delete-quiz-name/${name}`;
            return this.http.delete(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };
    // delete quiz question
    public deleteQuizQuestion(id): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/delete-question/${id}`;
            return this.http.delete(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };
    //delete answers for one question
    public deleteQuizAnswers(id): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/delete-answers/${id}`;
            return this.http.delete(url)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };

    //create quiz title
    public createQuizTitle(req): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/add-quiz-title`;
            return this.http.post(url, req)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };


    //create quiz title
    public createQuizQuestion(req): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://localhost:3000/add-quiz`;
            return this.http.post(url, req)
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    (error) => {
                        if (error && error.error) {
                            reject(error.error);
                        }

                    }
                );
        });
    };


}
