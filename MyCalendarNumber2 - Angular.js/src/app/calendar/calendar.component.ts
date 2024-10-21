import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// export class CalendarDay {
//   date = new Date();
//   isCurrentMonth = false;
// }
// another approach
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})

// export class CalendarComponent implements OnInit {
//   days: CalendarDay[] = [];

//   ngOnInit() {
//     this.generateCalendar();
//   }

//   private generateCalendar() {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth();
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
//     const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);

//     for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
//       this.days.push({
//         date: new Date(date),
//         isCurrentMonth: date.getMonth() === currentMonth,
//       });
//     }
//   }
// }

export class CalendarComponent implements OnInit {

  currentDate: Date;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weeks: any[];

  constructor() {
    this.weeks = []; // Initialize weeks as an empty array
    this.currentDate = new Date(); // Initialize currentDate to the current date
  }

  ngOnInit() {
    this.currentDate = new Date();
  }

  getMonthName(month: number) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
  }

  getDaysInMonth(month: number, year: number) {
    // Function to calculate the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(month: number, year: number) {
    // Function to determine the weekday of the first day of the month
    return new Date(year, month, 1).getDay();
  }

  getWeeksOfMonth() {
    const firstDay = this.getFirstDayOfMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    const daysInMonth = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    const emptyDays = firstDay === 0 ? 0 : 7 - firstDay;

    const weeks: any[] = [];
    let week: any[] = [];

    // Add empty days before the first day of the month
    for (let i = 0; i < emptyDays; i++) {
      week.push({ day: null, month: null });
    }

    // Add days to weeks
    for (let day = 1; day <= daysInMonth; day++) {
      week.push({ day: day, month: this.currentDate.getMonth() });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Add empty days after the last day of the month
    if (week.length > 0) {
      for (let i = week.length; i < 7; i++) {
        week.push({ day: null, month: null });
      }
      weeks.push(week);
    }

    return weeks;
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.weeks = this.getWeeksOfMonth();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.weeks = this.getWeeksOfMonth();
  }
}



