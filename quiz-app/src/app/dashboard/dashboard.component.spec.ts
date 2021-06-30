import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuizService } from '../../services/quiz.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('Dashboard Component', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgZorroAntdModule
      ],
      declarations: [
        DashboardComponent,
        NavbarComponent
      ],
      providers: [
        QuizService
      ]
    })
    const fixture = TestBed.createComponent(DashboardComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
