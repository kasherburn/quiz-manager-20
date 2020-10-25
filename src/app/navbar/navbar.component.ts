import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  editQuiz() {
    this.router.navigateByUrl('quiz-edit')
  }

  goHome() {
    this.router.navigateByUrl('dashboard')
  }

  logout() {
    this.router.navigateByUrl('login')
  }
}
