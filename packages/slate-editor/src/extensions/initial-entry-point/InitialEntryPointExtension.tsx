import { type Extension, withoutNodes } from '@prezly/slate-commons';
import React from 'react';

import { EntryPointElement } from './EntryPointElement';
import { isEntryPoint } from './EntryPointNode';
import {
    convertAdditionalEntryPoints,
    convertNonEmptyInitialEntryPoint,
    deleteNestedInitialEntryPoint,
    deleteUnnecessaryInitialEntryPoint,
    insertInitialEntryPoint,
} from './normalization';

export const EXTENSION_ID = InitialEntryPointExtension.name;

export function InitialEntryPointExtension(): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode: [
            insertInitialEntryPoint,
            deleteUnnecessaryInitialEntryPoint,
            deleteNestedInitialEntryPoint,
            convertNonEmptyInitialEntryPoint,
            convertAdditionalEntryPoints,
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
