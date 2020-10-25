import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/auth';
      return this.http.post(url, credentials)
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

  public register(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/register';
      return this.http.post(url, credentials)
        .subscribe(
          result => {
            resolve({ result });

          },
          (error) => {
            if (error) {
              reject({ error });
            }

          }
        );
    });
  };
  //get user
  public getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/user';
      return this.http.get(url)
        .subscribe(
          result => {
            resolve({ result });

          },
          (error) => {
            if (error) {
              reject({ error });
            }

          }
        );
    });
  };

}
