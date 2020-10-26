import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  editQuiz() {
    this.router.navigateByUrl('quiz-edit')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'; //if already on edit quiz page reset page including variables
  }

  goHome() {
    this.router.navigateByUrl('dashboard')
  }

  logout() {
    this.auth.logout().then((result) => {
      this.router.navigateByUrl('login')
    }).catch((err) => {
      console.log(err)
    });

  }
}
