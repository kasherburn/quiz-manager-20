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


  // update quiz questions or answers
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


}
