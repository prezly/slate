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
import { type SlateEditor } from '@udecode/plate';
import { createPlateEditor } from '@udecode/plate/react';
import { type PlatePlugin } from '@udecode/plate/react';

import { createParagraph } from '#extensions/paragraphs';
import { withNodesHierarchy, hierarchySchema } from '#modules/nodes-hierarchy';

import {
    DefaultTextBlockPlugin,
    withDeserializeHtml,
    RichBlocksPlugin,
    ElementsEqualityCheckPlugin,
} from './plugins';
import { type Value } from './types';

type Params = {
    initialValue?: Value;
    plugins?: PlatePlugin[];
    baseEditor?: SlateEditor;
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
    baseEditor,
    getExtensions = noExtensions,
    withOverrides = [],
}: Params) {
    const editor = createPlateEditor({
        editor: baseEditor,
        plugins: [
            ...plugins,
            DefaultTextBlockPlugin.configure({
                options: {
                    createDefaultTextBlock: createParagraph,
                },
            }),
            ElementsEqualityCheckPlugin,
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
        withInlineVoid(getExtensions),
        withNormalization(getExtensions),
        withUserFriendlyDeleteBehavior,
        withDeserializeHtml(getExtensions),
        ...extensionsOverrides,
    ])(editor);
}

function noExtensions(): Extension[] {
    return [];
}
