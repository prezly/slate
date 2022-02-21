import { withNormalization } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { InlineLinksExtension } from './InlineLinksExtension';

function getExtensions() {
    return [InlineLinksExtension()];
}

export function createInlineLinksEditor(input: JSX.Element) {
    return withNormalization(getExtensions)(input as unknown as Editor);
}
