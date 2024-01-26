// src/DataComponent.js
import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

const fetchDataObservable = new Observable(observer => {
  // Simulating an API call with a delay
  setTimeout(() => {
    const data = { message: 'Hello from RxJS and React!' };
    observer.next(data);
    observer.complete();
  }, 8000);
});

const DataComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const storedData = localStorage.getItem('rxData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };

    const subscription = fetchDataObservable.pipe(
      delay(10000), // Introducing a delay of 1 second using the delay operator
      switchMap(response => {
        // You can perform additional processing here if needed

        // Store the data in local storage
        localStorage.setItem('rxData', JSON.stringify(response));

        return new Observable(observer => {
          observer.next(response);
          observer.complete();
        });
      })
    ).subscribe({
      next: response => {
        setData(response);
      },
      error: error => {
        console.error('Error fetching data:', error);
        // Attempt to load data from local storage in case of an error
        loadDataFromLocalStorage();
      },
      complete: () => {
        console.log('Data fetching completed');
      }
    });

    // Load data from local storage on component mount
    loadDataFromLocalStorage();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>RxJS + React Demo</h1>
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataComponent;
