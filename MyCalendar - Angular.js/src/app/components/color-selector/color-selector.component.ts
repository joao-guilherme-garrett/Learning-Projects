import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
    selector: 'color-selector',
    templateUrl: './color-selector.component.html',
    styleUrls: ['./color-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColorSelectorComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ColorSelectorComponent),
            multi: true,
        }
    ]
})
export class ColorSelectorComponent implements OnInit {

    active = false

    palette = [
        'blue',
        'light-blue',
        'red',
        'purple',
        'yellow',
        'green',
        'orange',
    ]

    constructor() { }

    ngOnInit(): void {
    }

    @Input('disabled') disabled: boolean;

    _value
    set value(val) {
        this._value = val
        this.onChange(val)
        this.onTouch(val)
    }
    get value() { return this._value }

    writeValue(value: any) {
        this.value = value
    }

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

    validate({ value }: FormControl) {
        // CUSTOM VALIDATIONS GO HERE
        return null
    }

}
