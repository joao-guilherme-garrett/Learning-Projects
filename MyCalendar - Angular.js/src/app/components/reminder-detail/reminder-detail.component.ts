import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reminder, CalendarDay } from 'src/app/types';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RemindersService } from 'src/app/services/reminders.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'reminder-detail',
    templateUrl: './reminder-detail.component.html',
    styleUrls: ['./reminder-detail.component.scss']
})
export class reminderDetailComponent implements OnInit {

    _reminder: Reminder
    @Input('reminder') 
    get reminder(){return this._reminder}
    set reminder(val){this._reminder = val; this.ngOnInit()}
    @Input('day') day: CalendarDay
    @Input('edition') edition

    @Output('close') close_output: EventEmitter<void> = new EventEmitter()
    @Output('new-value') new_value_output: EventEmitter<void> = new EventEmitter()

    reminder_form: FormGroup = this._form_builder.group({
        'id': new FormControl('', [Validators.required]),
        'color': new FormControl('', [Validators.required]),
        'date': new FormControl('', [Validators.required]),
        'text': new FormControl('', [Validators.required, Validators.maxLength(30)]),
        'city': new FormControl(null, [Validators.required]),
    })

    weather: any
    forecast_available = false
    forecast

    constructor(private _form_builder: FormBuilder, private _reminders_service: RemindersService, private _weather_service: WeatherService) {}

    /**
     * @description sets either the given reminder or a new one to the form value and tries to fetch forecast
     * @memberof reminderDetailComponent
     */
    ngOnInit(): void {
        if(this.reminder){
            this.reminder_form.setValue(this.reminder)
        } else {
            this.reminder_form.setValue({
                'id': `${new Date().getTime()}`,
                'color': 'blue',
                'date': this.day.moment,
                'text': '',
                'city': null,
            })
        }

        if(this.reminder_form.value.city){
            this._weather_service.get_weather(this.reminder_form.value.city.id, this.reminder_form.value.date).subscribe(forecast => {
                if(forecast.message){
                    this.forecast_available = false
                } else {
                    this.forecast_available = true
                }
                this.forecast = forecast
            })
        }
    }

    /**
     * @description Toggles edition of the current reminder
     * @memberof reminderDetailComponent
     */
    action_edit(){
        this.edition = true
    }

    /**
     * @description Triggers deletion for the current reminder and closes the overlay
     * @memberof reminderDetailComponent
     */
    action_delete(){
        this.reminder = this.reminder_form.value
        this._reminders_service.delete_reminder(this.reminder)
        this.edition = false
        this.close_output.emit()
    }

    /**
     * @description Closes the reminder detail
     * @memberof reminderDetailComponent
     */
    action_close(){
        this.close_output.emit()
    }

    /**
     * @description Saves current reminder if the form is valid and updates the weather forecast
     * @memberof reminderDetailComponent
     */
    action_save(){
        if(this.reminder_form.valid){
            this.reminder = this.reminder_form.value
            this._reminders_service.set_reminder(this.reminder)
            this.edition = false
            if(this.reminder_form.value.city){
                this._weather_service.get_weather(this.reminder_form.value.city.id, this.reminder_form.value.date).subscribe(forecast => {
                    if(forecast.message){
                        this.forecast_available = false
                    } else {
                        this.forecast_available = true
                    }
                    this.forecast = forecast
                })
            }
        }
    }
}
