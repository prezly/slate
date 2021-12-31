import { withNormalization } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import ParagraphsExtension from './ParagraphsExtension';

function getExtensions() {
    return [ParagraphsExtension()];
}

export function createParagraphsEditor(input: JSX.Element) {
    return withNormalization(getExtensions)(input as unknown as Editor);
}
