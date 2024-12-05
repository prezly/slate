import { withNormalization } from '@prezly/slate-commons';
import { Alignment } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

import { ParagraphsExtension } from './ParagraphsExtension';

function getExtensions() {
    return [ParagraphsExtension({ defaultAlignment: Alignment.LEFT })];
}

export function createParagraphsEditor(input: JSX.Element) {
    return withNormalization(getExtensions)(input as unknown as SlateEditor);
}
