import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

describe('NavbarComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgZorroAntdModule
      ],
      declarations: [
        NavbarComponent
      ],
      providers: [
        AuthService
      ]
    })
    const fixture = TestBed.createComponent(NavbarComponent)
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
