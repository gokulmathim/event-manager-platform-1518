import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;
  submitting = false;

  // eslint-disable-next-line no-unused-vars
  constructor(private _auth: AuthService, private _router: Router) {}

  /** PUBLIC_INTERFACE Login handler */
  submit() {
    this.submitting = true;
    this.error = null;
    this._auth.login(this.email, this.password).subscribe({
      next: () => this._router.navigate(['/events']),
      error: () => { this.error = 'Invalid email or password'; this.submitting = false; }
    });
  }
}
