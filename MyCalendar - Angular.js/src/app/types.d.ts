export interface Reminder {
    id: string;
    date: moment.Moment;
    city: Country;
    text: string;
    color: string
}

export interface CalendarDay {
    date: number;
    moment: moment.Moment;
    last_month?: boolean;
    next_month?: boolean;
    reminders: Reminder[];
}

export interface Country{
    id: number
    name: string
    state: string
    country: string
    coord: {lon: number, lat:number}
}

export enum Palette{
    red = 'red',
    green = 'green',
    blue = 'blue',
    purple = 'purple',
    yellow = 'yellow',
    light_blue = 'light-blue',
    orange = 'orange',
}