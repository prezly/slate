import type { MentionNode, VariableNode } from '@prezly/slate-types';

export type MentionElementType = MentionNode | VariableNode;

export interface Option<V> {
    id: string | number;
    label: string;
    value: V;
}
