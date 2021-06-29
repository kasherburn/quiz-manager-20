import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'quiz-time', component: QuizPageComponent, canActivate: [AuthGuardService] },
    { path: 'quiz-edit', component: QuizEditComponent, canActivate: [AuthGuardService] },
    { path: 'quiz-create', component: QuizCreateComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
