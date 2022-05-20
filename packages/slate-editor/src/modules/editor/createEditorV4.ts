import {
    withBreaksOnExpandedSelection,
    withBreaksOnVoidNodes,
    withInlineVoid,
    withNormalization,
    withUserFriendlyDeleteBehavior,
} from '@prezly/slate-commons';
import type { Extension } from '@prezly/slate-commons';
import type { WithOverrides } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { flow } from '#lodash';

import { withImages } from '#extensions/image';
import { withLoaders } from '#extensions/loader';

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
    plugins: WithOverrides[] = [],
) {
    const overrides = getExtensions()
        .map(({ withOverrides }) => withOverrides)
        .filter((o): o is WithOverrides => Boolean(o));

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
        withImages,
        withFilePasting(getExtensions),
        ...overrides,
        ...plugins,
    ])(baseEditor);
}
