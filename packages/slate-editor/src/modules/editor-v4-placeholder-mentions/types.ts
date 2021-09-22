import { PlaceholderNode } from '@prezly/slate-types/node_modules/@prezly/slate-types';

export interface Placeholder {
    key: string;
    text: string;
}

export type PlaceholderMentionElementType = PlaceholderNode & {
    key: Placeholder['key'];
};

export interface PlaceholderMentionsExtensionParameters {
    placeholders: Placeholder[];
}
