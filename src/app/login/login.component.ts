import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_creds: any = {
    "username": '',
    "password": ''
  }
  constructor(
    public router: Router,
    private auth: AuthService,
    public notification: NotificationService
  ) { }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.login_creds).then((result) => {
      if (result.data.message == 'user not found!') {
        this.notification.createNotification('error', 'There has been a problem,', result.data.message)
        return;
      }
      if (result.data.isAuthenticated) {
        this.router.navigateByUrl('dashboard')
      }
    }).catch((err) => {
      console.log(err)
      this.notification.createNotification('error', 'There has been a problem,', 'Please try again!')
      this.login_creds = {
        "username": '',
        "password": ''
      }
    });

  }

  register() {
    this.auth.register(this.login_creds).then((result) => {
      this.notification.createNotification('success', 'Success!', `${this.login_creds.username} has now been registered, please login!`)
      this.login_creds = {
        "username": '',
        "password": ''
      }
    }).catch((err) => {
      console.log(err)
      this.notification.createNotification('error', 'There has been a problem,', 'Please try again!')
    });
  }

}
