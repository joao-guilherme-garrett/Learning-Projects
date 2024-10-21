import { Component, OnInit, Input, forwardRef, AfterContentInit, Self, Optional } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import moment from 'moment';

@Component({
    selector: 'date-time',
    templateUrl: './date-time.component.html',
    styleUrls: ['./date-time.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimeComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateTimeComponent),
            multi: true,
        }
    ]
})
export class DateTimeComponent implements OnInit, AfterContentInit, ControlValueAccessor {
    @Input('disabled') disabled: boolean;
    date_time_builder: Subject<string> = new Subject()
    text: string = ''

    invalid = false

    constructor() {
        
    }

    ngOnInit(): void {
        this.date_time_builder.pipe(
            debounceTime(300))
            .subscribe(date_text => {
                let date = moment(date_text, 'MM-DD-YYYY HH:mm', true)
                if(date.isValid()){
                    this.value = date
                }
            })
    }
    
    ngAfterContentInit(){
        if(this.value && this.value.isValid && this.value.isValid()){
            this.text = this.value.format('MM-DD-YYYY HH:mm')
        }
    }

    build_date_time(){
        if(!this.value || this.value.format('MM-DD-YYYY HH:mm') !== this.text){
            this.value = null
            this.date_time_builder.next(this.text)
        }
    }

    _value: moment.Moment
    set value(val) {
        this._value = val
        this.onChange(val)
        this.onTouch(val)
    }
    get value() { return this._value }

    writeValue(value: any) {
        this.value = value
    }

    // JUST LIKE IN THE COUNTRY-FINDER COMPONENT, THESE METHODS BELOW WERE BASED ON COLOR-SELECTOR COMPONENTS, COPY-PASTED FROM THERE, BECAUSE THE NEEDED FUNCTIONALITIES WERE SIMILAR.

    /**
     * @description This method stores the callback ONCHANGE so we can call it when necessary
     * @param fn 
     */
    registerOnChange(fn: any) {
        this.onChange = fn
    }
    onChange: any = () => { }

    /**
     * @description This method stores the callback ONTOUCHED so we can call it when necessary
     * @param fn 
     */
    registerOnTouched(fn: any) {
        this.onTouch = fn
    }
    onTouch: any = () => { }

    /**
     * @description This method is called automatically by ngControl
     * @param {boolean} isDisabled
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    validate(form_control: FormControl) {
        // CUSTOM VALIDATIONS GO HERE
        let out = this.value ? null : {incorrectDateError: true}
        if(out){
            this.invalid = true
        } else {
            this.invalid = false
        }
        return out
    }
}
