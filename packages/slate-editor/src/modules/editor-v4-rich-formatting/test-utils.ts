import { withInlineVoid, withNormalization } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import RichFormattingExtension from './RichFormattingExtension';
import withRichFormatting from './withRichFormatting';

function getExtensions() {
    return [RichFormattingExtension({ blocks: true, links: true, menu: true })];
}

export function createRichFormattingEditor(input: JSX.Element) {
    return withNormalization(getExtensions)(
        withInlineVoid(getExtensions)(withRichFormatting(input as unknown as Editor)),
    );
}
