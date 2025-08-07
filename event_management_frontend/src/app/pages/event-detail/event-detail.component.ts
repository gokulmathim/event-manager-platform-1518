import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
  imports: [CommonModule]
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  loading = true;

  constructor(private _route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getEvent(id).subscribe({
      next: (data: Event) => { this.event = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
