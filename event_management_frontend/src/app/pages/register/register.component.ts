import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error: string | null = null;
  submitting = false;

  constructor(private auth: AuthService, private router: Router) {}

  /** PUBLIC_INTERFACE Register handler */
  submit() {
    this.submitting = true;
    this.error = null;
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/events']),
      error: () => { this.error = 'Registration failed'; this.submitting = false; }
    });
  }
}
