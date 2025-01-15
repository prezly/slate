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
import { type Editor } from '@udecode/plate';
import { createPlateEditor } from '@udecode/plate/react';
import { type PlatePlugin } from '@udecode/plate/react';

import { createParagraph } from '#extensions/paragraphs';
import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import {
    withDefaultTextBlock,
    withDeserializeHtml,
    withElementsEqualityCheck,
    RichBlocksPlugin,
} from './plugins';
import { type Value } from './types';

type Params = {
    initialValue?: Value;
    plugins?: PlatePlugin[];
    editor?: Editor;
    /**
     * @deprecated It is planned to migrate extensions to become Plate Plugins
     */
    getExtensions?: () => Extension[];
    /**
     * @deprecated It is recommended to migrate these overrides to become Plate Plugins
     */
    withOverrides?: WithOverrides[];
};

export function createEditor({
    initialValue,
    plugins = [],
    editor,
    getExtensions = noExtensions,
    withOverrides = [],
}: Params) {
    const baseEditor = createPlateEditor({
        editor,
        plugins: [
            ...plugins,
            RichBlocksPlugin.configure({
                options: { getExtensions },
            }),
        ],
        value: initialValue,
    });

    const extensionsOverrides = getExtensions()
        .map((extension) => extension.withOverrides)
        .filter(isNotUndefined);

    return flow([
        ...withOverrides,
        withNodesHierarchy(hierarchySchema),
        withBreaksOnExpandedSelection,
        withBreaksOnVoidNodes,
        withDefaultTextBlock(createParagraph),
        withInlineVoid(getExtensions),
        withNormalization(getExtensions),
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        withElementsEqualityCheck,
        ...extensionsOverrides,
    ])(baseEditor);
}

function noExtensions(): Extension[] {
    return [];
}
