import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'quiz-time', component: QuizPageComponent },
  { path: 'quiz-edit', component: QuizEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
