import { type Extension, withoutNodes } from '@prezly/slate-commons';
import React from 'react';
import type { Element } from 'slate';

import { EntryPointElement } from './EntryPointElement';
import { isEntryPoint } from './EntryPointNode';
import {
    convertAdditionalEntryPoints,
    convertNonEmptyInitialEntryPoint,
    deleteNestedInitialEntryPoint,
    deleteUnnecessaryInitialEntryPoint,
    insertInitialEntryPoint,
} from './normalization';

export const EXTENSION_ID = EntryPointsExtension.name;

interface ExtensionParameters {
    createDefaultTextElement: (props?: Partial<Element>) => Element;
}

export function EntryPointsExtension({ createDefaultTextElement }: ExtensionParameters): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [
            insertInitialEntryPoint,
            deleteUnnecessaryInitialEntryPoint,
            deleteNestedInitialEntryPoint,
            function (editor, entry) {
                return convertNonEmptyInitialEntryPoint(editor, entry, createDefaultTextElement);
            },
            function (editor, entry) {
                return convertAdditionalEntryPoints(editor, entry, createDefaultTextElement);
            },
        ],
        renderElement: ({ attributes, children, element }) => {
            if (isEntryPoint(element)) {
                return <EntryPointElement {...attributes}>{children}</EntryPointElement>;
            }
            return undefined;
        },
        serialize: (nodes) => withoutNodes(nodes, isEntryPoint),
    };
}
