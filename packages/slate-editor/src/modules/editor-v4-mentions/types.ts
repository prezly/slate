import { Element } from 'slate';

export interface MentionElementType<T extends string> extends Element {
    type: T;
}

export interface Option<V> {
    id: string | number;
    label: string;
    value: V;
}
