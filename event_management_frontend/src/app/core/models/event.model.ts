/** Interfaces for events and core domain models for the event management platform. */

/**
 * PUBLIC_INTERFACE
 * Defines an Event.
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  location: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  createdBy: string; // Organizer user id
  tags?: string[];
  attendeesCount: number;
  capacity: number;
  isPublic: boolean;
}

/**
 * PUBLIC_INTERFACE
 * RSVP/Registration information.
 */
export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'going' | 'interested' | 'not_going';
  createdAt: string; // ISO string
}

/**
 * PUBLIC_INTERFACE
 * User profile.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isOrganizer: boolean;
  bio?: string;
  joinedOn: string; // ISO string
}
