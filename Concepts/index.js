import {
    fromEvent,
    of ,
    Subject,
    BehaviorSubject,
    timer,
    interval
} from 'rxjs';

import {
    map,
    takeUntil,
    shareReplay,
    count,
} from 'rxjs/operators';

const observable = () => {
    // grab button reference
    const button = document.getElementById('myButton');

    // create an observable of button clicks
    const myObservable = fromEvent(button, 'click');
}

const subscription = () => {
    // grab button reference
    const button = document.getElementById('myButton');

    // create an observable of button clicks
    const myObservable = fromEvent(button, 'click');

    // for now, let's just log the event on each click
    const subscription = myObservable.subscribe(event => console.log(event));
}

const operator = () => {
    const dataSource = of (1, 2, 3, 4, 5);

    // subscribe to our source observable
    const subscription = dataSource
        .pipe(
            // add 1 to each emitted value
            map(value => value + 1)
        )
        // log: 2, 3, 4, 5, 6
        .subscribe(value => console.log(value));
}

const pipe = () => {
    // observable of values from a text box, pipe chains operators together
    inputValue
        .pipe(
            // wait for a 200ms pause
            debounceTime(200),
            // if the value is the same, ignore
            distinctUntilChanged(),
            // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
            switchMap(searchTerm => typeaheadApi.search(searchTerm))
        )
        // create a subscription
        .subscribe(results => {
            // update the dom
        });
}

const creation_operators = () => {
    const destroySubject = new Subject();
    let arr = [];
    destroySubject.subscribe();
    fromEvent(window, 'scroll')
        .pipe(
            // we will discuss cleanup strategies like this in future article
            takeUntil(destroySubject)
        )
        .subscribe(event => {
            // calculate and update DOM
            if (arr.length < 5) {
                arr.push(event);
                console.log(event);
            } else {
                destroySubject.unsubscribe();
            }

        });
}

const multicasting_operators = () => {
    const subject = new BehaviorSubject([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const source = subject.pipe(shareReplay());

    const firstSubscriber = source.subscribe((next) => {
        // perform some action
        console.log(next, ' => USER 1');
    })

    // sometime later...

    // second subscriber gets last emitted value on subscription, shares execution context with 'firstSubscriber'
    const secondSubscriber = source.subscribe((next) => {
        // perform some action
        console.log(next, ' => USER 2');
    });

}

export function init() {

    // ? Observable____________________________________________________________________________________
    // * Observable - це потічок, стрім (з реального життя вода з крану яка тече).

    // TODO: 
    // observable();

    // ? Subscription__________________________________________________________________________________
    // * Subscription - це підписка на стрім (з реального жиитя можна взяти приклад, 
    // * що є людина і вона має наступні можливості як поводитися з краном: 
    // * --- відкрити кран (підписатися на стрім)
    // * --- закрити кран (відписатися від стріму)
    // * --- зловити той момент, коли людина закрила кран (завершення стріму)

    // * Якщо зробити нову підписку на стрім, то нова прив'язка функції до даного контексту.
    // * Тобто, за одним краном можуть спострерігати багато людей, але тільки одна людина
    // * зможе закрити кран або всі люди почнуть спочатку битися, а потім той хто виживе - закриє кран.

    // * В метод 'subscription()' можна передавати колбеки, а можна передати об'єкт з ключами
    // ! subscription(observer(), error(), completed())
    // ! subscription({observer: observer, error: error(), completed: completed()})

    // * Якщо в нас є закладена якась логіка на даний(один) стрім, то ми можемо створювати власний сценарій.
    // * Власний сценарій можемо створювати за допомогою "Subject". 
    // * Якщо наводити приклад з життя, то "Subject" слідкує за стрімом(водою з крану) і якщо потрапляється
    // * якесь сміття - він(Subject) повідомляє нас про це. Тобто, можна сказати що це найманий працівник
    // * або раб 😂

    // TODO: 
    // subscription();

    // ? Operators_____________________________________________________________________________________
    // * Operators - це така щтука, яка нам допомагає змінювати вихідні дані з сріму. 
    // * Якщо наводити приклад з життя, то якщо взяти стрім(вода яка тече з крану), то ми будемо
    // * красити воду. І у спускний отвір, де вода стікає(observer) бачить тільки зафарбовану воду.
    // ! Можна зробити висновок, що приходять нам на вхід одні дані, ми їх трансформуємо і даємо
    // ! для користувача нові дані
    // TODO:
    // operator();

    // ? Pipe__________________________________________________________________________________________
    // * Pipe - це труба в яку ми можемо запихати свії оператори(рабів), які будуть нам модифікувати
    // * вхідні дані.
    // TODO:
    // pipe();

    // ? Operators can be grouped into common categories_______________________________________________
    // * --- untility (сервісні оператори| пошук багів, відкладка коду).
    // * --- creation (для створення стріму | звичайні евенти JS також можна перетворити на)
    // *     стрім).
    // TODO:
    // creation_operators();
    // * --- сombination (для об'єднання вихідних даних із декілької стрімів).
    // * --- error (для відловлення помилок і їх обробка).
    // * --- filtering (дає методи для прийняття даної вхідногї інформації або відхилення. Pipe
    // *     завжди опрацьовує кожен елемент почерзі(окремо).
    // * --- multicasting (по стандарту observables є одноадресні, але можна зробити багатоадресним).
    // TODO:
    // multicasting_operators();
    // * --- transformation (дає методи для трансформування вхідної інформації | обробляє кожен об'єкт)

    // ? Operators have common behaviors_______________________________________________________________
    // * --- flatten (оператори для керування підпискою в середині підписки).
    // * --- switch (переключають підписки | наприклад, була одна підписка і
    // *     на іншу підписку, а від попередньої відписалися).
    // * ---concat (якщо важливий порядок виконання підписок | спочатку
    // *     виконується одна і якщо вона завершується - автоматично підписуємося на
    // *     наступну підписку).
    // * --- merge (добавлення(об'єднання) нової підписки до головної "observable" | 
    // * --- якщо брати приклад з життя, то можна навести аналогію автомагістралі, коли 
    // * --- якась машина перестроюється на одну головну полосу з другої полоси).
}