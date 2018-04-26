import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public us: UserService) { }

  ngOnInit() {
  }

  register(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.us.register(email, password);
  }
}
