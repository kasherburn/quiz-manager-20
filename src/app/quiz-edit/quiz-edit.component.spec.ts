import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { QuizEditComponent } from './quiz-edit.component';
import { AuthService } from 'src/services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizEditComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        QuizEditComponent,
        NavbarComponent
      ],
      providers: [
        AuthService,
        NzNotificationService,
        { provide: NZ_I18N, useValue: en_US }
      ]
    })
    const fixture = TestBed.createComponent(QuizEditComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
