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
      const url = 'http://localhost:3000/quizzes';
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

  // get quiz questions based on quiz id
  public getQuizQuestions(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3000/quizzes/questions/${id}`;
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
  // get all quiz questions
  public getAllQuizQuestions(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/quizzes/questions';
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

  // update quiz questions or answers
  public updateQuizQuestion(quiz): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `http://localhost:3000/quizzes/update-question`;
      return this.http.put(url, quiz)
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
