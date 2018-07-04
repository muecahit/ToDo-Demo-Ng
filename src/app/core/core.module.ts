import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {LogoutFormComponent} from './logout-form/logout-form.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserService} from './user.service';
import {Route, RouterModule} from '@angular/router';
import {OnlyNotAuthGuard} from './guards/only-not-auth.guard';
import {FormsModule} from '@angular/forms';
import {OnlyAuthGuard} from './guards/only-auth.guard';
import {JwtInterceptor} from './jwt.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiInterceptor} from './api.interceptor';


const routes: Route[] = [
  {path: 'login', component: LoginFormComponent, canActivate: [OnlyNotAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [OnlyNotAuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  declarations: [
    NavbarComponent,
    LoginFormComponent,
    LogoutFormComponent,
    RegisterComponent
  ],
  exports: [
    NavbarComponent,
    LoginFormComponent,
    LogoutFormComponent,
    RegisterComponent
  ],
  providers: [
    UserService,
    OnlyAuthGuard,
    OnlyNotAuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class CoreModule {
}
