import { Component, OnInit, Input, forwardRef, AfterContentInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { Country } from 'src/app/types';
import { Subject } from 'rxjs';
import { debounce, debounceTime, filter, mergeMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'country-finder',
    templateUrl: './country-finder.component.html',
    styleUrls: ['./country-finder.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CountryFinderComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CountryFinderComponent),
            multi: true,
        }
    ]
})
export class CountryFinderComponent implements OnInit, AfterContentInit, ControlValueAccessor {
    @Input('disabled') disabled: boolean;
    active = false
    city_list = []
    text = ''
    country_search_subject: Subject<string> = new Subject()
    invalid = false
    touched = false

    constructor(private _weather_service: WeatherService) {}
    
    ngOnInit(): void {
        this.country_search_subject.pipe(
            debounceTime(300),
            filter(city_name => city_name.length > 2),
            mergeMap(city_name => this._weather_service.get_city(city_name))
            ).subscribe(city_list => {
                this.active = true
                this.city_list = city_list
            })
    }

    ngAfterContentInit(){
        if(this.value){
            this.text = `${this.value.name}, ${this.value.country}`
            if(this.text.endsWith(', ')){
                this.text = `${this.value.name}`    
            }
        }       
    }

    select_country(country: Country){
        this.value = country
        this.text = `${country.name}, ${country.country}`
        this.active = false
    }

    search_countries(){
        this.value = null
        this.country_search_subject.next(this.text)
        this.touched = true
    }

    _value = null
    set value(val) {
        this._value = val
        this.onChange(val)
        this.onTouch(val)
    }
    get value() { return this._value }

    writeValue(value: any) {
        this.value = value
    }

    // THESE METHODS BELOW WERE BASED ON COLOR-SELECTOR COMPONENTS, COPY-PASTED FROM THERE, BECAUSE THE NEEDED FUNCTIONALITIES WERE SIMILAR.
    /**
     * @description This method stores the callback ONCHANGE so we can call it when necessary
     * @param fn 
     */
    registerOnChange(fn: any) {
        this.onChange = fn
    }
    onChange: any = () => {}

    /**
     * @description This method stores the callback ONTOUCHED so we can call it when necessary
     * @param fn 
     */
    registerOnTouched(fn: any) {
        this.onTouch = fn
    }
    onTouch: any = () => {}

    /**
     * @description This method is called automatically by ngControl
     * @param {boolean} isDisabled
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    validate(form_control: FormControl) {
        // CUSTOM VALIDATIONS GO HERE
        let out = this.value ? null : {incorrectCityError: true}
        if(out){
            this.invalid = true
        } else {
            this.invalid = false
        }
        return out
    }

}
