# jobsity-calendar

# Joao Guilherme Garrett
## Angular Coding Challenge

**My Approach :** As I spoke to Tamara from HR before, my dad had a surgery recently and I still have to take him to the doctor or drive him to places. All this apart from my current job. Added to this situation, I have had to handle my mother coming home from Rio Grande do Sul, in Brazil, a state which is under a weather catasthopy. So, my time was too short to take this test, unfortunately.
I am telling this because when I opened the project, I depared myself with a project built under older versions of Angular and Node (compared to the ones I have installed). Hence, I had three choices: I could update the project to be compatible with nowadays Angular; or, build it from the ground up; or, to code respecting the previous versions of Angular and Node.
Since I didn't have much time, I chose the last option, as most of the syntaxes are still the same nowadays. But basically what changed were the versions present on the json files.
After some research online, I could find the things I needed for the code to match the original version. So I believe it will run just fine.

I chose to use [moment.js](https://momentjs.com/) as my library for Date managing and no UI library was used to manage the precise behaviour of each component. The forecast may only be available for reminders no loger than 5 days apart from the current day because of FREE user limitation for [OpenWeather](https://openweathermap.org/"). Reminders are stored on the browser local storage in separate lists by month.

**Bonus tasks completed :**

- [x] Expand the calendar to support more than the current month.            
- [x] Properly handle overflow when multiple reminders appear on the same date
- [x] Functionality to delete one or ALL the reminders for a specific day.

**Instructions :** To run the project clone the repo or download the code and have Node.js installed, then on the directory with the code run the command `npm install` and wait until it finshes, finally run the command `ng serve` and check [localhost:4200](http://localhost:4200/). In general, the npm install command will add all the needed dependencies, and the tsconfig file has the "importHelpers" set to true, so it will probably run, but due to the older version of Angular or Node used on this project, maybe you need to install other packages like @angular/core or tslib, for example. Maybe even need to install the moment library to run some features.
