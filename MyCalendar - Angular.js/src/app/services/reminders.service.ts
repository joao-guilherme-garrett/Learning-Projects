import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Reminder, CalendarDay } from '../types';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class RemindersService {

    reminder_list: Subject<Reminder[]> = new Subject()

    constructor() { }
    /**
     * @description Gets a list of reminders from the browser localStorage based on the provided month and year, then emits it from *reminder_list*
     * @param { number } month
     * @param { number } year
     * @memberof RemindersService
     */
    get_reminders(month: number, year: number): void {
        // simulated API call
        // TODO: implement basic reminder API
        let reminder_list: any[] = JSON.parse(localStorage.getItem(`${month}-${year}_reminders`) || '[]')

        reminder_list = reminder_list
            .map(r => { r.date = moment(r.date); return r })
            .filter(r => r.date.month() === month && r.date.year() === year)

        this.reminder_list.next(reminder_list as Reminder[])
        // transform ISOStrings to moment instances and return only reminders from selected month
    }

    /**
     * @description adds or replaces the provided reminder to the corresponding month and year list, then emits the modified list from *reminder_list*
     * @param {Reminder} reminder
     * @param {number} month
     * @param {number} year
     * @memberof RemindersService
     */
    set_reminder(reminder: Reminder) {
        let month = reminder.date.month()
        let year = reminder.date.year()
        let reminder_list: any[] = JSON.parse(localStorage.getItem(`${month}-${year}_reminders`) || '[]')
        reminder_list = reminder_list.map(r => { r.date = moment(r.date); return r })
        let existing_reminder_index = reminder_list.findIndex(r => r.id === reminder.id)

        if (existing_reminder_index > -1) {
            // reminder already exists, this is an edition
            reminder_list[existing_reminder_index] = reminder
        } else {
            reminder_list.push(reminder)
        }

        this.reminder_list.next(reminder_list as Reminder[])
        this.save_reminder_list(reminder_list, month, year)
    }

    /**
     * @description removes the provided reminder from the corresponding month and year list if found, then emits the modified list from *reminder_list*
     * @param {Reminder} reminder
     * @param {number} month
     * @param {number} year
     * @memberof RemindersService
     */
    delete_reminder(reminder: Reminder) {
        let month = reminder.date.month()
        let year = reminder.date.year()
        let reminder_list: any[] = JSON.parse(localStorage.getItem(`${month}-${year}_reminders`) || '[]')
        reminder_list = reminder_list.map(r => { r.date = moment(r.date); return r })
        let existing_reminder_index = reminder_list.findIndex(r => r.id === reminder.id)
        if (existing_reminder_index > -1) {
            reminder_list.splice(existing_reminder_index, 1)
        }

        this.reminder_list.next(reminder_list as Reminder[])
        this.save_reminder_list(reminder_list, month, year)
    }

    /**
     * @description removes the provided reminder from the corresponding month and year list if found, then emits the modified list from *reminder_list*
     * @param {Reminder} reminder
     * @param {number} month
     * @param {number} year
     * @memberof RemindersService
     */
    delete_day_reminders(day: CalendarDay, month: number, year: number) {
        let reminder_list: any[] = JSON.parse(localStorage.getItem(`${month}-${year}_reminders`) || '[]')
        reminder_list = reminder_list.map(r => { r.date = moment(r.date); return r })

        for(let i = 0; i < reminder_list.length; i++){
            if(reminder_list[i].date.date() === day.moment.date()){
                reminder_list.splice(i,1)
                i--
            }
        }

        this.reminder_list.next(reminder_list as Reminder[])
        this.save_reminder_list(reminder_list, month, year)
    }

    private save_reminder_list(reminder_list: any[], month: number, year: number) {
        localStorage.setItem(`${month}-${year}_reminders`, JSON.stringify(reminder_list))
    }
}

export class MockRemindersService {

    static mock_reminders: Reminder[] = [
        { "id": "1595721754353",
         "color": "red",
         "date": moment("2020-07-17T00:02:29.835Z"),
         "text": "texto 2",
         "city": { "id": 6357216,
            "name": "Cordoba",
            "state": "",
            "country": "ES",
            "coord": { "lon": -4.77768,
            "lat": 37.90448 } } },

        { "id": "1595725187280",
         "color": "blue",
         "date": moment("2020-07-18T00:59:26.672Z"),
         "text": "texto",
         "city": { "id": 6357216,
            "name": "Cordoba",
            "state": "",
            "country": "ES",
            "coord": { "lon": -4.77768,
            "lat": 37.90448 } } },

        { "id": "1595801913253",
         "color": "blue",
         "date": moment("2020-07-30T22:18:20.316Z"),
         "text": "reminder",
         "city": { "id": 6357216,
            "name": "Cordoba",
            "state": "",
            "country": "ES",
            "coord": { "lon": -4.77768,
            "lat": 37.90448 } } }
    ]

    reminder_list: Subject<Reminder[]> = new Subject()
    /**
     * @description Gets a list of reminders from the browser localStorage based on the provided month and year, then emits it from *reminder_list*
     * @param { number } month
     * @param { number } year
     * @memberof RemindersService
     */
    get_reminders(month, year): void {
        let reminder_list = MockRemindersService.mock_reminders;

        this.reminder_list.next(reminder_list as Reminder[])
    }
    /**
     * @description adds or replaces the provided reminder to the corresponding month and year list, then emits the modified list from *reminder_list*
     * @param {Reminder} reminder
     * @param {number} month
     * @param {number} year
     * @memberof RemindersService
     */
    set_reminder(reminder: Reminder, month: number, year: number) {
        let reminder_list = MockRemindersService.mock_reminders;
        let existing_reminder_index = reminder_list.findIndex(r => r.id === reminder.id)

        if (existing_reminder_index > -1) {
            // reminder already exists, this is an edition
            reminder_list[existing_reminder_index] = reminder
        } else {
            reminder_list.push(reminder)
        }

        this.reminder_list.next(reminder_list as Reminder[])
    }
    /**
     * @description removes the provided reminder from the corresponding month and year list if found, then emits the modified list from *reminder_list*
     * @param {Reminder} reminder
     * @param {number} month
     * @param {number} year
     * @memberof RemindersService
     */
    delete_reminder(reminder: Reminder, month: number, year: number) {
        let reminder_list = MockRemindersService.mock_reminders;
        let existing_reminder_index = reminder_list.findIndex(r => r.id === reminder.id)
        
        if (existing_reminder_index > -1) {
            reminder_list.splice(existing_reminder_index, 1)
        }

        this.reminder_list.next(reminder_list as Reminder[])
    }
}
