import {
    fromEvent,
    of
} from 'rxjs';
import {
    map
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
}