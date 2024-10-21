import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Country } from '../types';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    static cities: any

    private public_api_key = '67a31e49e68a903e7996c86ce11b2486'// JoaoGarrett public OpenWeatherMap api key

    constructor(private http: HttpClient) {}
    
    /**
     * @description Returns the 5 day / 3 hour forecast from https://api.openweathermap.org/ for the given city and time
     * @param {number} city_id
     * @param {moment.Moment} moment_instance
     * @returns {Observable<any>}
     * @memberof WeatherService
     */
    get_weather(city_id, moment_instance: moment.Moment): Observable<any>{
        return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?id=${city_id}&appid=${this.public_api_key}&units=imperial`).pipe(catchError(err => null), map((response: any) => {
            if(response){
                let day_hour = moment_instance.format("yyyy-MM-DD HH")
                let forecast = response.list.find(forecast => forecast.dt_txt.includes(day_hour))
                if(forecast){
                    return forecast
                } else {
                    return {message: "No Forecast Available"}
                }
            } else {
                return {message: "No Forecast Available"}
            }
        }))
    }

    /**
     * @author N4cho!
     * @description Returns a list of cities that matches with the provided name search, city.list.json provided by https://api.openweathermap.org/
     * @param {string} name
     * @returns {Observable<Country[]>}
     * @memberof WeatherService
     */
    get_city(name: string): Observable<Country[]>{
        return this.http.get('./assets/city.list.json').pipe(map((data: any[]) => {
            return data.filter(c => c.name.toLowerCase().includes(name.toLowerCase())).slice(0,25)
        }))
    }
}

export class MockWeatherService{
    static mock_cities: Country[] = [
        { 
            "id": 6357216,
            "name": "Cordoba",
            "state": "",
            "country": "ES",
            "coord": { "lon": -4.77768, "lat": 37.90448 },
        },
        { 
            "id": 680831,
            "name": "Cordun",
            "state": "",
            "country": "RO",
            "coord": {lon: 26.866671, lat: 46.950001},
        },
        { 
            "id": 5128581,
            "name": "New York City",
            "state": "NY",
            "country": "US",
            "coord": {lon: -74.005966, lat: 40.714272},
        },
    ]

    static mock_weather: any = {
        "cod": "200",
        "message": 0,
        "cnt": 40,
        "list": [{
            "dt": 1578409200,
            "main": {
                "temp": 284.92,
                "feels_like": 281.38,
                "temp_min": 283.58,
                "temp_max": 284.92,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1016,
                "humidity": 90,
                "temp_kf": 1.34
            },
            "weather": [{
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }],
            "clouds": {"all": 100},
            "wind": {"speed": 5.19,"deg": 211},
            "sys": {"pod": "d"},
            "dt_txt": "2020-01-07 15:00:00"
        }],
        "city": {
            "id": 2643743,
            "name": "London",
            "coord": {"lat": 51.5073,"lon": -0.1277},
            "country": "GB",
            "timezone": 0,
            "sunrise": 1578384285,
            "sunset": 1578413272
        }
    }

    get_weather(city_id, moment_instance: moment.Moment): Observable<any>{
        return of(MockWeatherService.mock_weather)
    }
    
    get_city(name: string): Observable<Country[]>{
        return of(MockWeatherService.mock_cities)
    }
}