import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = true;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this.api.getEvents().subscribe({
      next: (data: Event[]) => {
        this.events = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
