import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent implements OnInit {
  form: Partial<Event> = {};
  submitting = false;
  loading = true;
  error: string | null = null;

  constructor(private _route: ActivatedRoute, private _api: ApiService, private _router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getEvent(id).subscribe({
      next: (event: Event) => { this.form = { ...event }; this.loading = false; },
      error: () => { this.error = 'Failed to load event'; this.loading = false; }
    });
  }

  /** PUBLIC_INTERFACE Save edits */
  submit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.submitting = true; this.error = null;
    this.api.editEvent(id, this.form).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => { this.error = 'Failed to save changes'; this.submitting = false; }
    });
  }
}
