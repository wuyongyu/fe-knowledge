[RxJS](http://reactivex.io/rxjs/manual/overview.html)
===

```js
// Introduction
var subscription = Rx.Observable.interval(500).take(4).subscribe((x) =>
  console.log(x)
);

// Observable
let observable = Rx.Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

observable.subscribe({
  next: x => console.log('get value: ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});

// Observable as generalization of function
let foo = Rx.Observable.create((observer) => {
  console.log('hello');
  observer.next(18);
});

foo.subscribe((x) => {
  console.log(x);
});

// Observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"
let foo = Rx.Observable.create((observer) => {
  console.log(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300);
  }, 1000)
})

foo.subscribe((x) => {
  console.log(x);
})

// Executing Observables
let observable = Rx.Observable.create(function subscribe(observer){
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err);
  }
})
observable.subscribe(x => console.log(x));

// Disposing Observable Executions
let observable = Rx.Observable.from([10, 20, 30]);
let subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();

// Clear an interval execution
let observable = Rx.Observable.create(function subscribe(observer){
  let intervalID = setInterval(() => {
    observer.next('hello');
  }, 1000);
  return function unsubscribe(){
    clearInterval(intervalID);
  }
})

let subscription = observable.subscribe({
  next: (x) => console.log(x)
})
subscription.unsubscribe();

// Rather straightforward JavaScript
function subscribe(observer){
  let intervalID = setInterval(() => {
    observer.next('hello');
  }, 1000);
  return function unsubscribe() {
    clearInterval(intervalID);
  };
}
let unsubscribe = subscribe({
  next: (x) => console.log(x)
});
unsubscribe();

// Observer
let observer = {
  next: x => console.log('Observer get a next value: ' + x),
  error: err => console.error('Observer get an error: ' + err),
  complete: () => console.log('Observer get a complete notification'),
};

let observable = Rx.Observable.create((observer) => {
  observer.next(18);
})

observable.subscribe(observer);

// Subscription
let observable = Rx.Observable.interval(1000);
let subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();

// Subscriptions put together
let observable1 = Rx.Observable.interval(400);
let observable2 = Rx.Observable.interval(300);
let subscription = observable1.subscribe(x =>
  console.log('first: ' + x)
);
let childSubscription = observable2.subscribe(x =>
  console.log('second: ' + x)
);
subscription.add(childSubscription);
setTimeout(() => {
  subscription.unsubscribe();
}, 1000);

// Subject
var subject = new Rx.Subject();
subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});
subject.subscribe({
  next: (x) => console.log('observerB: ' + x)
});
subject.next(18);
```