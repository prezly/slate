import { withNormalization } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import ParagraphsExtension from './ParagraphsExtension';

const getExtensions = () => [ParagraphsExtension()];

export const createParagraphsEditor = (input: JSX.Element) =>
    withNormalization(getExtensions)(input as unknown as Editor);
