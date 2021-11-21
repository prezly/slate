import type { MentionNode, PlaceholderNode } from '@prezly/slate-types';

export type MentionElementType = MentionNode | PlaceholderNode;

export interface Option<V> {
    id: string | number;
    label: string;
    value: V;
}
