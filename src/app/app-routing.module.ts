import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventUpdateComponent } from './event-update/event-update.component';

const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'update-event/:id', component: EventUpdateComponent }, 
  { path: '', redirectTo: '/events', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
