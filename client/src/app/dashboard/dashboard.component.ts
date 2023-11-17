import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { AuthUser, SocketUrl, User } from '../auth/auth.data';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  constructor(
    @Inject(SocketUrl) public socketUrl: string,
    @Inject(AuthUser) public user: User,
  ) {}

  welcomeMessage = '';

  onWelcomeClick() {
    alert(`${this.welcomeMessage ? this.welcomeMessage : 'Welcome'} ${this.user.username}`);
  }

  stringifyUser() {
    return JSON.stringify(this.user, null, 2);
  }
}
