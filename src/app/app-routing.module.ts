import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { AuthGuardService } from '../services/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'quiz-time', component: QuizPageComponent, canActivate: [AuthGuardService] },
  { path: 'quiz-edit', component: QuizEditComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
