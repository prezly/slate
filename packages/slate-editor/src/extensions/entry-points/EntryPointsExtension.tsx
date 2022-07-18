import { type Extension, withoutNodes } from '@prezly/slate-commons';
import React from 'react';
import type { Element } from 'slate';

import { EntryPointElement } from './EntryPointElement';
import { EntryPointNode } from './EntryPointNode';
import {
    convertAdditionalEntryPoints,
    convertNonEmptyEntryPoints,
    deleteNestedEntryPoints,
    deleteUnnecessaryEntryPoints,
    insertLeadingEntryPoint,
    insertTrailingEntryPoint,
} from './normalization';

export const EXTENSION_ID = EntryPointsExtension.name;

interface ExtensionParameters {
    createDefaultTextElement: (props?: Partial<Element>) => Element;
}

export function EntryPointsExtension({ createDefaultTextElement }: ExtensionParameters): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [
            insertLeadingEntryPoint,
            insertTrailingEntryPoint,
            deleteUnnecessaryEntryPoints,
            deleteNestedEntryPoints,
            function (editor, entry) {
                return convertAdditionalEntryPoints(editor, entry, createDefaultTextElement);
            },
            function (editor, entry) {
                return convertNonEmptyEntryPoints(editor, entry, createDefaultTextElement);
            },
        ],
        renderElement: ({ attributes, children, element }) => {
            if (EntryPointNode.isEntryPoint(element)) {
                return <EntryPointElement {...attributes}>{children}</EntryPointElement>;
            }
            return undefined;
        },
        serialize: (nodes) => withoutNodes(nodes, EntryPointNode.isEntryPoint),
    };
}
