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
import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import {
    withDeserializeHtml,
    withFilePasting,
    withNonEmptyValue,
    withRichBlocks,
    withSlatePasting,
    withVoids,
} from './plugins';

export function createEditor(
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
        withNodesHierarchy(hierarchySchema),
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
        withRichBlocks(getExtensions),
        ...overrides,
        ...plugins,
    ])(baseEditor);
}
