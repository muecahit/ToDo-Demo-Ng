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
import {LogoutFormComponent} from './logout-form/logout-form.component';
import {RegisterComponent} from './register/register.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {TokenHelperService} from './services/token-helper.service';
import {OnlyNotAuthGuard} from './services/only-not-auth.guard';
import {OnlyAuthGuard} from './services/only-auth.guard';


const routes: Route[] = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent, canActivate: [OnlyNotAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [OnlyNotAuthGuard]},
  {path: '**', redirectTo: ''}
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
    RouterModule.forRoot(routes)
  ],
  providers: [
    TokenHelperService,
    UserService,
    OnlyAuthGuard,
    OnlyNotAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
