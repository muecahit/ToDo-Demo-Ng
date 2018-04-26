import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {Route, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './interceptors/api.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {LogoutFormComponent} from './logout-form/logout-form.component';
import {RegisterComponent} from './register/register.component';


const routes: Route[] = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    LogoutFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: () => localStorage.getItem('todo-Token'),
          whitelistedDomains: ['http://localhost:18460/']
        }
      }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
