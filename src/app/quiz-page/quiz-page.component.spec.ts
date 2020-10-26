import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageComponent } from './quiz-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { QuizService } from 'src/services/quiz.service';

describe('QuizPageComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        QuizPageComponent,
        NavbarComponent
      ],
      providers: [
        QuizService
      ]
    })
    const fixture = TestBed.createComponent(QuizPageComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
