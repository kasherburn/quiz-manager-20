import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';


describe('LoginComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        NgZorroAntdModule
      ],
      declarations: [LoginComponent],
      providers: [
        NzNotificationService,
        { provide: NZ_I18N, useValue: en_US }]
    })
    const fixture = TestBed.createComponent(LoginComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
