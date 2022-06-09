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

import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import { withDeserializeHtml, withFilePasting, withNonEmptyValue, withRichBlocks } from './plugins';

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
        withNodesHierarchy(hierarchySchema),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withInlineVoid(getExtensions),
        withNormalization(getExtensions),
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        withFilePasting(getExtensions),
        withRichBlocks(getExtensions),
        ...overrides,
        ...plugins,
    ])(baseEditor);
}
