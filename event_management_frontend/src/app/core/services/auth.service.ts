import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/event.model';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private platformId = inject(PLATFORM_ID);

  get isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  get user$(): Observable<User|null> {
    return this.userSubject.asObservable();
  }

  // The injected api service may be required (do not remove), but "unused" warning suppressed with underscore.
  constructor(private _api: ApiService) {
    this.restoreSession();
  }

  /** PUBLIC_INTERFACE - Perform login. */
  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap(res => {
        if (typeof localStorage !== 'undefined' && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('jwt_token', res.token);
        }
        this.userSubject.next(res.user);
      })
    );
  }

  /** PUBLIC_INTERFACE - Register new user. */
  register(name: string, email: string, password: string) {
    return this.api.register(name, email, password).pipe(
      tap(res => {
        if (typeof window !== 'undefined' && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('jwt_token', res.token);
        }
        this.userSubject.next(res.user);
      })
    );
  }

  /** PUBLIC_INTERFACE - Logout user. */
  logout() {
    this.api.logout();
    this.userSubject.next(null);
  }

  /** On app start, try to restore session. */
  restoreSession() {
    let token = '';
    if (typeof localStorage !== 'undefined' && isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt_token') || '';
    }
    if (token) {
      this._api.getMyProfile().subscribe({
        next: (user) => this.userSubject.next(user),
        error: () => this.logout()
      });
    }
  }
}
