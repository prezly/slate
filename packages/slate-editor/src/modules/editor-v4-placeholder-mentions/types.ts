import { PlaceholderNode } from '@prezly/slate-types';

export interface Placeholder {
    key: PlaceholderNode['key'];
    text: string;
}

export type PlaceholderMentionElementType = PlaceholderNode & {
    key: Placeholder['key'];
};

export interface PlaceholderMentionsExtensionParameters {
    placeholders: Placeholder[];
}
