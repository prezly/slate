import { withExtensions } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import { ParagraphsExtension } from './ParagraphsExtension';

function getExtensions() {
    return [ParagraphsExtension()];
}

export function createParagraphsEditor(input: JSX.Element) {
    // FIXME: Enable ParagraphsExtension for the test
    console.log(getExtensions()); // FIXME: Remove this
    return withExtensions(input as unknown as Editor);
}
