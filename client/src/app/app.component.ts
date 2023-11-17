import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { authHostPath } from './auth/auth-routing.module';
import { authUser } from './auth/auth.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  constructor(private router: Router) {}

  async onLogout() {
    this.router.navigateByUrl(authHostPath);
  }

  isAuthenticated() {
    return authUser.isAuthenticated;
  }
}
