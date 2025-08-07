import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  imports: [CommonModule, RouterModule]
})
export class MainLayoutComponent {
  isLoggedIn: Observable<boolean>;
  constructor(auth: AuthService) {
    this.isLoggedIn = auth.user$.pipe(
      // Convert user object to boolean
      (source) => new Observable<boolean>((observer) =>
        source.subscribe(v => observer.next(!!v))
      )
    );
  }
  logout() {
    // No reference to unused auth
    // Exposed event for (click)
  }
}
