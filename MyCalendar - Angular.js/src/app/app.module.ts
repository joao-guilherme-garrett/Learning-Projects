import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { reminderDetailComponent } from './components/reminder-detail/reminder-detail.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryFinderComponent } from './components/country-finder/country-finder.component';
import { DateTimeComponent } from './components/date-time/date-time.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ReminderComponent,
    reminderDetailComponent,
    ColorSelectorComponent,
    CountryFinderComponent,
    DateTimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
