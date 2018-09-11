import {Component} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.scss']
})
export class LogoutFormComponent {

  constructor(public us: UserService) { }
}
