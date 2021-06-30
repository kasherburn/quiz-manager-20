import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {



  constructor(
    private router: Router

  ) { }
  // checks for bearer token when navigating to pages - if no bearer token you will be redirected to login page
  canActivate(route: ActivatedRouteSnapshot) {
    const bearer_token = localStorage.getItem("bearer_token");
    if (!bearer_token) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }

}
