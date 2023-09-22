import {
    withBreaksOnExpandedSelection,
    withBreaksOnVoidNodes,
    withExtensions,
    withUserFriendlyDeleteBehavior,
} from '@prezly/slate-commons';
import { flow } from '@technically/lodash';
import type { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

import { createParagraph } from '#extensions/paragraphs';
import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import { withDefaultTextBlock } from './plugins';

export function createEditor(baseEditor: Editor) {
    return flow([
        withReact,
        withHistory,
        withExtensions,
        withNodesHierarchy(hierarchySchema),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withDefaultTextBlock(createParagraph),
        withUserFriendlyDeleteBehavior,
    ])(baseEditor);
}
