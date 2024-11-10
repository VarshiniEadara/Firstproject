import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  today: string = '';  // Declare 'today' property
  event: any = {
    name: '',
    location: '',
    date: '',
    description: ''
  };
  showSuccessMessage = false;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
  }

  // Method to handle form submission
  addEvent(eventForm: NgForm): void {
    if (eventForm.invalid) {
      return;  // Prevent submission if the form is invalid
    }

    this.eventService.addEvent(this.event).subscribe(
      response => {
        console.log('Event added successfully:', response);
        this.showSuccessMessage = true;  // Show success message

        // Optionally navigate back to event list after success
          eventForm.reset();  // Reset the form after submission
      },
      error => {
        console.error('Error adding event:', error);
      }
    );
  }
}
