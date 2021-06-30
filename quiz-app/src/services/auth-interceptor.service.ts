import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  // add bearer token to authorisation header for each http request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const bearer_token = localStorage.getItem("bearer_token");

    if (bearer_token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + bearer_token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
