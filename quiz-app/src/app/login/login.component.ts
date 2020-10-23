import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_creds: any = {
    "email": '',
    "password": ''
  }
  constructor(
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.login_creds).then((result) => {
      this.router.navigateByUrl('dashboard')
    }).catch((err) => {
      console.log(err)
    });

  }

}
