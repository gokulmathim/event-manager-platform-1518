import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.css'
})
export class OrganizerDashboardComponent implements OnInit {
  myEvents: Event[] = [];
  loading = true;

  // eslint-disable-next-line no-unused-vars
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMyEvents().subscribe({
      next: (events: Event[]) => { this.myEvents = events; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
