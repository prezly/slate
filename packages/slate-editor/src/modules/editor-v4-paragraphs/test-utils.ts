import { withNormalization } from '@prezly/slate-commons';
import { ReactEditor } from 'slate-react';

import ParagraphsExtension from './ParagraphsExtension';

const getExtensions = () => [ParagraphsExtension()];

export const createParagraphsEditor = (input: JSX.Element) =>
    withNormalization(getExtensions)((input as unknown) as ReactEditor);
