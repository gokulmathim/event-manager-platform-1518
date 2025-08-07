import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {
  form = {
    title: '', description: '', location: '', startTime: '', endTime: '', capacity: 1, isPublic: true
  };
  submitting = false;
  error: string | null = null;

  // Prefix unused for DI warnings (but keep for template use/future expansion)
  // eslint-disable-next-line no-unused-vars
  constructor(private _api: ApiService, private _router: Router) {}

  /** PUBLIC_INTERFACE Create event and navigate to details on success */
  submit() {
    this.submitting = true;
    this.error = null;
    this._api.createEvent(this.form).subscribe({
      next: (created: any) => this._router.navigate(['/events', created.id]),
      error: () => { this.error = 'Failed to create event'; this.submitting = false; }
    });
  }
}
