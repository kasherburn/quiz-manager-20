import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  // take bearer token from login response and save to local storage
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('bearer_token', authResult.bearer_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }


  public authenticate(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/auth';
      return this.http.post(url, credentials)
        .subscribe(
          data => {
            this.setSession(data);
            resolve({ data });
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


  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:3000/logout';
      return this.http.get(url)
        .subscribe(
          result => {
            localStorage.removeItem("bearer_token");
            localStorage.removeItem("expires_at");
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

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
