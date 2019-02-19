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
```