import type { PlaceholderKey } from '@prezly/slate-types';

export interface Placeholder {
    key: PlaceholderKey;
    text: string;
}

export interface PlaceholderMentionsExtensionParameters {
    placeholders: Placeholder[];
}
