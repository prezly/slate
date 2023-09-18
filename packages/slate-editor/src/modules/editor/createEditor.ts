import {
    withBreaksOnExpandedSelection,
    withBreaksOnVoidNodes,
    withNormalization,
    withUserFriendlyDeleteBehavior,
} from '@prezly/slate-commons';
import type { Extension } from '@prezly/slate-commons';
import type { WithOverrides } from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import { flow } from '@technically/lodash';
import type { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { createParagraph } from '#extensions/paragraphs';
import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import {
    withDefaultTextBlock,
    withDeserializeHtml,
    withRichBlocks,
} from './plugins';

export function createEditor(
    baseEditor: Editor,
    getExtensions: () => Extension[],
    plugins: WithOverrides[] = [],
) {
    const overrides = getExtensions()
        .map(({ withOverrides }) => withOverrides)
        .filter(isNotUndefined);

    return flow([
        withReact,
        withHistory,
        withNodesHierarchy(hierarchySchema),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withDefaultTextBlock(createParagraph),
        withNormalization(getExtensions),
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        withRichBlocks(getExtensions),
        ...overrides,
        ...plugins,
    ])(baseEditor);
}
