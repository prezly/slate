export interface Suggestion<T> {
    id: string;
    value: T;
    disabled?: boolean;
}

type Callback = () => void;
type Unsubscribe = () => void;

export type Subscribable = {
    subscribe: (callback: Callback) => Unsubscribe;
};
