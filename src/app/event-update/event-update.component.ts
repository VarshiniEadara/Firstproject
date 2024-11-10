import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {
  event: any = {};  // This will hold the event data to be updated

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.activatedRoute.snapshot.paramMap.get('id');  // Get event ID from route param
    if (eventId) {
      this.eventService.getEventById(Number(eventId)).subscribe((data) => {
        this.event = data;
      });
    }
  }

  eventUpdate(eventForm: NgForm): void {
    if (eventForm.invalid) {
      return;  // Don't submit if the form is invalid
    }

    this.eventService.updateEvent(this.event.id, this.event).subscribe(
      (response) => {
        console.log('Event updated successfully:', response);
        this.router.navigate(['/events']); // Navigate back to event list after successful update
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }
}
