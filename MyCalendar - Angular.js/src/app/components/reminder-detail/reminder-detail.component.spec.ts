import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { reminderDetailComponent } from './reminder-detail.component';
import { RemindersService, MockRemindersService } from 'src/app/services/reminders.service';
import { WeatherService, MockWeatherService } from 'src/app/services/weather.service';
import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('reminderDetailComponent', () => {
    let component: reminderDetailComponent;
    let fixture: ComponentFixture<MockHostComponent>;
    // Test setup
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MockHostComponent, reminderDetailComponent ],
            providers: [
                reminderDetailComponent,
                FormBuilder,
                { provide: RemindersService, useClass: MockRemindersService },
                { provide: WeatherService, useClass: MockWeatherService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]// preventing "'inner-component' is not a known element"
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MockHostComponent);// creates mock host element so @Input can be filled
        component = fixture.debugElement.children[0].componentInstance;// the desired instance
        fixture.detectChanges();
    });

    // finally can begin testing
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should not add reminder if there are more than 30 chars or a city is not included', () => {
        let _reminders_service = fixture.debugElement.injector.get(RemindersService);
        let set_reminder_spy = spyOn(_reminders_service, 'set_reminder')
        component.ngOnInit()
        // define mock user data
        let invalid_reminders = [
            {
                id: `${new Date().getTime()}`,                                                 // * correct id
                city: MockWeatherService.mock_cities[0],                                       // * correct city
                color: "green",                                                                // * correct color
                date: moment(),                                                                // * correct date
                text: 'This string has more than thirty characters'                            // ! incorrect text
            },
            {
                id: `${new Date().getTime()}`,                                                 // * correct id
                city: null,                                                                    // ! incorrect city
                color: "green",                                                                // * correct color
                date: moment(),                                                                // * correct date
                text: 'This string short'                                                      // * correct date
            }
        ]
        for(let invalid_reminder of invalid_reminders){
            // set data to form
            component.reminder_form.setValue(invalid_reminder)
            // test form validity
            expect(component.reminder_form.valid).toBeFalse()
            // trigger save action
            component.action_save()
            expect(set_reminder_spy).toHaveBeenCalledTimes(0)
        }
    });

    it('should add reminder if there are less than 30 chars', () => {
        let _reminders_service = fixture.debugElement.injector.get(RemindersService);
        let set_reminder_spy = spyOn(_reminders_service, 'set_reminder')
        let valid_id = `${new Date().getTime()}`
        _reminders_service.reminder_list.subscribe(reminder_list => {
            let created_reminder = reminder_list.find(({id}) => id === valid_id)
            expect(created_reminder).toBeDefined()
        })

        component.ngOnInit()
        // define mock user data
        let valid_reminder = {
            id: valid_id,                            // * correct id
            city: MockWeatherService.mock_cities[0], // * correct city
            color: "green",                          // * correct color
            date: moment(),                          // * correct date
            text: 'This string is short'             // * correct text
        }
        // set data to form
        component.reminder_form.setValue(valid_reminder)
        // test form validity
        expect(component.reminder_form.valid).toBeTrue()
        // trigger save action
        component.action_save()
        expect(set_reminder_spy).toHaveBeenCalledTimes(1)
    });
});

@Component({
    selector: `mock-host-component`,
    template: `<reminder-detail [day]="mock_chosen_day" [reminder]="null" [edition]="true"></reminder-detail>`
})
class MockHostComponent {
    mock_chosen_day = {
        moment: moment(),
        date: moment().date(),
        reminders: []
    }
}