import { withInlineVoid, withNormalization } from '@prezly/slate-commons';
import { Editor } from 'slate';

import RichFormattingExtension from './RichFormattingExtension';
import withRichFormatting from './withRichFormatting';

const getExtensions = () => [RichFormattingExtension({ blocks: true, links: true, menu: true })];

export const createRichFormattingEditor = (input: JSX.Element) =>
    withNormalization(getExtensions)(
        withInlineVoid(getExtensions)(withRichFormatting((input as unknown) as Editor)),
    );
