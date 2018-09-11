import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(public us: UserService) {
  }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.us.register(email, password);
  }
}
