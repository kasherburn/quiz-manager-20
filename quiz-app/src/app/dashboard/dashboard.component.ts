import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  selectQuiz() {
    this.router.navigateByUrl('quiz-time')
  }



}
