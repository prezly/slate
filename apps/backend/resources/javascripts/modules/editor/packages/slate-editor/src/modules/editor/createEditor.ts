import {
    withBreaksOnExpandedSelection,
    withBreaksOnVoidNodes,
    withInlineVoid,
    withNormalization,
    withUserFriendlyDeleteBehavior,
} from '@prezly/slate-commons';
import type { Extension, WithOverrides } from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import { flow } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate';

import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import { withDeserializeHtml, withElementsEqualityCheck, withRichBlocks } from './plugins';

export function createEditor(
    baseEditor: SlateEditor,
    getExtensions: () => Extension[],
    plugins: WithOverrides[] = [],
) {
    const overrides = getExtensions()
        .map(({ withOverrides }) => withOverrides)
        .filter(isNotUndefined);

    return flow([
        ...plugins,
        withNodesHierarchy(hierarchySchema),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withInlineVoid(getExtensions),
        withNormalization(getExtensions),
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        withRichBlocks(getExtensions),
        withElementsEqualityCheck,
        ...overrides,
    ])(baseEditor);
}
