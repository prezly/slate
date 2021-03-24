type Subscription<T> = (value: T) => void;

type Unsubscribe = () => void;

interface State<T> {
    subscriptions: Subscription<T>[];
    value: T;
}

class Observable<T> {
    private state: State<T>;

    constructor(value: T) {
        this.state = {
            subscriptions: [],
            value,
        };
    }

    get value(): T {
        return this.state.value;
    }

    set value(value: T) {
        if (this.state.value === value) {
            return;
        }

        this.state.value = value;

        for (const subscription of this.state.subscriptions) {
            subscription(value);
        }
    }

    subscribe = (subscription: Subscription<T>): Unsubscribe => {
        this.state.subscriptions.push(subscription);

        return () => {
            const index = this.state.subscriptions.indexOf(subscription);

            if (index >= 0) {
                this.state.subscriptions.splice(index, 1);
            }
        };
    };
}

export default Observable;
