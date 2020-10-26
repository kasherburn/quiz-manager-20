import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';
import { QuizService } from 'src/services/quiz.service';

describe('AppComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        NavbarComponent,
        QuizPageComponent,
        QuizEditComponent
      ],
      providers: [
        AuthService,
        QuizService,
        { provide: NZ_I18N, useValue: en_US }
      ]
    })
    const fixture = TestBed.createComponent(AppComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
