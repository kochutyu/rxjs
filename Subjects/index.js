import {
    Subject,
    BehaviorSubject,
    ReplaySubject,
    AsyncSubject,
    fromEvent,
    interval,
    merge,
} from 'rxjs';

import {
    map,
    tap,
    mergeMap
} from 'rxjs/operators';

function newSubject() {
    // RxJS v6+
    const sub = new Subject();

    sub.next(1); //! Subject doesn't see before subscribe!
    sub.subscribe(x => {
        console.log('Subscriber A', x);
    });
    sub.next(2); // OUTPUT => Subscriber A 2
    sub.subscribe(x => {
        console.log('Subscriber B', x);
    });
    sub.next(3); // OUTPUT => Subscriber A 3, Subscriber B 3 (logged from both subscribers)
}


function newBehaviorSubject_1() {
    const subject = new BehaviorSubject(123);

    // two new subscribers will get initial value => output: 123, 123
    subject.subscribe(console.log);
    subject.subscribe(console.log);

    // two subscribers will get new value => output: 456, 456
    subject.next(456);

    // new subscriber will get latest value (456) => output: 456
    subject.subscribe(console.log);

    // all three subscribers will get new value => output: 789, 789, 789
    subject.next(789);

    // output: 123, 123, 456, 456, 456, 789, 789, 789
}

function newBehaviorSubject_2() {
    // RxJS v6+
    document.body.innerHTML = '';

    const setElementText = (elemId, text) =>
        (document.getElementById(elemId).innerText = text.toString());
    const addHtmlElement = coords =>
        (document.body.innerHTML += `
    <div 
    id=${coords.id}
    style="
    top: calc(${coords.y}px - 15px);
    left: calc(${coords.x}px - 15px); 
    "
    class="coords"
    >
    </div>`);

    const subject = new BehaviorSubject(0);

    const click$ = fromEvent(document, 'click').pipe(
        map((e) => ({
            x: e.clientX,
            y: e.clientY,
            id: Math.random()
        })),
        tap(addHtmlElement),
        mergeMap(coords => subject.pipe(tap(v => setElementText(coords.id, v))))
    );

    const interval$ = interval(1000).pipe(
        tap(v => {
            subject.next(v)
            console.log(addHtmlElement);
        }),
    );

    merge(click$, interval$).subscribe();
}

function newReplaySubject() {
    // RxJS v6+

    const sub = new ReplaySubject(3);

    sub.next(1);
    sub.next(2);
    sub.subscribe(console.log); // OUTPUT => 1,2
    sub.next(3); // OUTPUT => 3
    sub.next(4); // OUTPUT => 4
    sub.subscribe(console.log); // OUTPUT => 2,3,4 (log of last 3 values from new subscriber)
    sub.next(5); // OUTPUT => 5,5 (log from both subscribers)
}

function newAsyncSubject() {
    // RxJS v6+
    const sub = new AsyncSubject();

    sub.subscribe(console.log);

    sub.next(123); //nothing logged

    sub.subscribe(console.log);

    sub.next(456); //nothing logged
    sub.complete(); //456, 456 logged by both subscribers
}

export function init() {
    // newSubject();
    // newBehaviorSubject_1();
    // newBehaviorSubject_2();
    // newReplaySubject();
    // newAsyncSubject();
}