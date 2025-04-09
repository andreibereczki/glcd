import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication/services/authentication.service';
import { By } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

const AuthenticationServiceMock = {
  isAuthenticated: jest.fn()
};

describe('AppComponent', () => {
  let authenticationService: jest.Mocked<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes), { provide: AuthenticationService, useValue: AuthenticationServiceMock }],
      imports: [AppComponent]
    }).compileComponents();

    authenticationService = jest.mocked(TestBed.inject(AuthenticationService));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it.each([
    { testcase: 'render header if authenticated', isAuthenticated: true },
    { testcase: 'not render header if not authenticated', isAuthenticated: false }
  ])('should $testcase', ({ isAuthenticated }) => {
    const fixture = TestBed.createComponent(AppComponent);
    authenticationService.isAuthenticated.mockReturnValue(isAuthenticated);

    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('header'));

    if (isAuthenticated) {
      expect(header).toBeTruthy();
    } else {
      expect(header).toBeFalsy();
    }
  });
});
