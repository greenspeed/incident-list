import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';
import { PriorityNamePipe } from './shared/pipes/priority-name.pipe';
import { PriorityImagePipe } from './shared/pipes/priority-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IncidentListComponent,
    PriorityNamePipe,
    PriorityImagePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
