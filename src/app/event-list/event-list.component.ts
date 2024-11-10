import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';  // Adjust import path if necessary
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  loading = true;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    // Fetch events from the EventService
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: any[]) => {
        this.events = data;
        this.loading = false;  // Set loading to false when data is received
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.loading = false;  // Optionally, handle loading state on error
      }
    );
  }

  viewDetails(eventId: number): void {
    this.router.navigate([`/event/${eventId}`]);
  }
  selectEvent(event: any): void {
    console.log('Selected event:', event);  // Handle selected event
  }

  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        (response) => {
          console.log('Event deleted:', response);
          this.loadEvents(); // Refresh the list of events after deletion
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

   eventUpdate(event: any): void {
    this.router.navigate([`/update-event/${event.id}`]);
  }
  }

