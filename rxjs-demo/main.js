

// // main.js
// import { Observable } from 'rxjs';
// import { map, filter } from 'rxjs/operators';

// // Create an observable for temperature data
// const temperatureObservable = new Observable(observer => {
//   let temperatures = [23, 56,57,25, 20];
//   temperatures.forEach(temperature => observer.next(temperature));
//   observer.complete();
// });

// // Define an observer
// const temperatureObserver = {
//   next: value => console.log(`Temperature: ${value}°C`),
//   error: error => console.error(error),
//   complete: () => console.log('Temperature stream completed')
// };

// // Subscribe to the observable and apply operators
// temperatureObservable
//   .pipe(
//     map(temperature => temperature * 1.8 + 32), // Convert Celsius to Fahrenheit
//     filter(temperature => temperature > 70)      // Filter out temperatures below 70°F
// )
// .subscribe(temperatureObserver);




// main.js
import { Observable } from 'rxjs';

const myObservable = new Observable(observer => {
  observer.next('Hello');
  observer.next('world');
  observer.next('Sahil');
  observer.complete();
});

const myObserver = {
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log('Observable completed')
};

myObservable.subscribe(myObserver);

