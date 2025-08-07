/* global localStorage */
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event, RSVP, User } from '../models/event.model';

/** The base URL for the backend API, select via env or fallback for dev. */
const API_BASE = '/api'; // could be replaced by process.env.API_URL in real env

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private get headers(): HttpHeaders {
    let token = '';
    // SSR and browser safety: check for localStorage
    if (typeof localStorage !== 'undefined' && isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('jwt_token') || '';
    }
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }
  // PUBLIC_INTERFACE
  /** Fetch all events, optionally filtering with params. */
  getEvents(params?: { [k: string]: any }): Observable<Event[]> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<Event[]>(`${API_BASE}/events`, { params: httpParams, headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Fetch single event by ID */
  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${API_BASE}/events/${id}`, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Create a new event */
  createEvent(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(`${API_BASE}/events`, event, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Edit an event */
  editEvent(id: string, changes: Partial<Event>): Observable<Event> {
    return this.http.patch<Event>(`${API_BASE}/events/${id}`, changes, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** RSVP or register for an event */
  rsvpToEvent(eventId: string, status: 'going'|'interested'|'not_going'): Observable<RSVP> {
    return this.http.post<RSVP>(`${API_BASE}/events/${eventId}/rsvp`, { status }, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Get RSVPs for a user */
  getMyRSVPs(): Observable<RSVP[]> {
    return this.http.get<RSVP[]>(`${API_BASE}/user/rsvps`, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Delete an event */
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/events/${id}`, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Organizer: get their dashboard events. */
  getMyEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_BASE}/organizer/events`, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** User profile */
  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${API_BASE}/user/profile`, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Update profile */
  updateProfile(profile: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${API_BASE}/user/profile`, profile, { headers: this.headers });
  }
  // PUBLIC_INTERFACE
  /** Simple login */
  login(email: string, password: string): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${API_BASE}/auth/login`, { email, password });
  }
  // PUBLIC_INTERFACE
  /** Registration */
  register(name: string, email: string, password: string): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${API_BASE}/auth/register`, { name, email, password });
  }
  // PUBLIC_INTERFACE
  logout() {
    if (typeof localStorage !== 'undefined' && isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt_token');
    }
    return of(true);
  }
}
