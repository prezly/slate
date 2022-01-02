import type { Extension } from '@prezly/slate-commons';
import {
    withBreaksOnExpandedSelection,
    withBreaksOnVoidNodes,
    withInlineVoid,
    withNormalization,
    withUserFriendlyDeleteBehavior,
} from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { flow } from '#lodash';

import { withImages } from '../../modules/editor-v4-image';
import { withLoaders } from '../../modules/editor-v4-loader';
import { withRichFormatting } from '../../modules/editor-v4-rich-formatting';

import {
    withDeserializeHtml,
    withFilePasting,
    withNonEmptyValue,
    withRootElements,
    withSlatePasting,
    withVoids,
} from './plugins';

export function createEditorV4(
    baseEditor: Editor,
    getExtensions: () => Extension[],
    plugins: (<T extends Editor>(editor: T) => T)[],
) {
    return flow([
        withReact,
        withHistory,
        withNonEmptyValue,
        withVoids,
        // withRootElements needs to be before specific plugins, so that other plugins
        // can override it with more specific normalizations that will take precedence
        withRootElements(getExtensions),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withInlineVoid(getExtensions),
        withNormalization(getExtensions),
        withLoaders,
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        withSlatePasting,
        withRichFormatting,
        withImages,
        withFilePasting(getExtensions),
        ...plugins,
    ])(baseEditor);
}
