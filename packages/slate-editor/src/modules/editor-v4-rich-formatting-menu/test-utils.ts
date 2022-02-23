import { withInlineVoid, withNormalization } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { InlineLinksExtension } from '#modules/editor-v4-inline-links';
import { RichFormattingExtension, withRichFormatting } from '#modules/editor-v4-rich-formatting';

function getExtensions() {
    return [RichFormattingExtension({ blocks: true }), InlineLinksExtension()];
}

export function createRichFormattingEditor(input: JSX.Element) {
    return withNormalization(getExtensions)(
        withInlineVoid(getExtensions)(withRichFormatting(input as unknown as Editor)),
    );
}
