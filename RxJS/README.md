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

// We can convert a unicast Observable execution to multicast, through the Subject
let subject = new Rx.Subject();
subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});
subject.subscribe({
  next: (x) => console.log('observerB: ' + x)
});
var observable = Rx.Observable.from([1,2,3]);
observable.subscribe(subject);

// Multicasted Observables
let source = Rx.Observable.from([1, 2, 3]);
let subject = new Rx.Subject();
let multicasted = source.multicast(subject);
multicasted.subscribe({
  next: x => console.log('observerA: ' + x)
});
multicasted.subscribe({
  next: x => console.log('observerB: ' + x)
});
multicasted.connect();

// Reference counting
let source = Rx.Observable.interval(500);
let subject = new Rx.Subject();
let multicasted = source.multicast(subject);
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (x) => console.log('observerA: ' + x)
})

subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (x) => console.log('observerB: ' + x)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// refCount
let source = Rx.Observable.interval(500);
let subject = new Rx.Subject();
let refCounted = source.multicast(subject).refCount();
let subscription1, subscription2, subscriptionConnect;

console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: (x) => console.log('observerA: ' + x)
});

setTimeout(() => {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: (x) => console.log('observerB: ' + x)
  })
}, 600);

setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);

// BehaviorSubject
let subject = new Rx.BehaviorSubject(0);
subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});
subject.next(1);
subject.next(2);
subject.subscribe({
  next: (x) => console.log('observerB: ' + x)
});

subject.next(3);

// ReplaySubject
let subject = new Rx.ReplaySubject(3);

subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (x) => console.log('observerB: ' + x)
})

subject.next(5)

// we can specify a window time in milliseconds, besides of the buffer sizer, to determine how old the record values can be.
let subject = new Rx.ReplaySubject(100, 500);

subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});

let i = 1;
let clearData = setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (x) => console.log('observerB: ' + x)
  })
}, 1000);

setTimeout(() => {
  clearInterval(clearData);
}, 3000);

// AsyncSubject
let subject = new Rx.AsyncSubject();
subject.subscribe({
  next: (x) => console.log('observerA: ' + x)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (x) => console.log('observerB: ' + x)
});

subject.next(5);
subject.complete();

// Operators
function multiplyByTen(input){
  let output = Rx.Observable.create(function subscribe(observer){
    input.subscribe({
      next: (x) => observer.next(10 * x),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}

let input = Rx.Observable.from([1,2,3,4]);
let output = multiplyByTen(input);
output.subscribe(x => console.log(x));

// Instance operators
Rx.Observable.prototype.multiplyByTen = function multiplyByTen(){
  let input = this;  // this => ArrayObservable
  return Rx.Observable.create(function subscribe(observer){
    input.subscribe({
      next: (x) => observer.next(10 * x),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}
let observable = Rx.Observable.from([1,2,3,4]).multiplyByTen();
observable.subscribe(x => console.log(x));

// Static operators
let observable1 = Rx.Observable.interval(1000);
let observable2 = Rx.Observable.interval(1000);
let merge = Rx.Observable.merge(observable1, observable2);

// Scheduler
let observable = Rx.Observable.create(function (observer){
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
})
.observeOn(Rx.Scheduler.async);
console.log('just before subscribe');
observable.subscribe({
  next: x => console.log('get value: ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
})
console.log('just after subscribe');


// More Readability
let observable = Rx.Observable.create(function (proxyObserver){
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
})
.observeOn(Rx.Scheduler.async);

let finalObserver = {
  next: x => console.log('get value: ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done')
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');

// proxyObserver
var proxyObserver = {
  next: (value) => {
    Rx.Scheduler.async.scheduled(
      (x) => finalObserver.next(x),
      0,  // 延迟时间
      value  // 会作用于上面函数的参数 x
    )
  }
  // ...
}

// setTimeout(fn, 0) 会在下一个事件循环的最开始运行 fn
```