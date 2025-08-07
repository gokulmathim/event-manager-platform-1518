import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/event.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = true;
  mode: 'view' | 'edit' = 'view';
  error: string | null = null;
  editProfile: Partial<User> = {};

  // Prefix with _ to indicate intentional unused for Angular DI
  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getMyProfile().subscribe({
      next: (profile: User) => { this.user = profile; this.editProfile = { ...profile }; this.loading = false; },
      error: () => { this.error = 'Failed to load profile'; this.loading = false; }
    });
  }
  startEdit() { this.mode = 'edit'; }
  cancelEdit() { if (this.user) { this.editProfile = { ...this.user }; } this.mode = 'view'; }
  saveEdit() {
    this.api.updateProfile(this.editProfile).subscribe({
      next: (user: User) => { this.user = user; this.mode = 'view'; },
      error: () => { this.error = 'Failed to update'; }
    });
  }
}
