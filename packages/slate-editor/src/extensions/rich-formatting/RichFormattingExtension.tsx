import type { Extension, WithOverrides } from '@prezly/slate-commons';
import { onKeyDown as onKeyboardDoListsFormatting } from '@prezly/slate-lists';
import type { KeyboardEvent } from 'react';
import React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { flow, identity } from '#lodash';

import { RichTextElement, Text } from './components';
import { createDeserialize } from './createDeserialize';
import {
    isRichTextElement,
    normalizeRedundantRichTextAttributes,
    withResetFormattingOnBreak,
} from './lib';
import * as OnKeyDown from './onKeyDown';
import { ElementType } from './types';
import { withListsFormatting } from './withListsFormatting';

interface Parameters {
    blocks: boolean;
}

export const EXTENSION_ID = 'RichFormattingExtension';

export const RichFormattingExtension = ({ blocks }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: createDeserialize({ blocks }),
    normalizeNode: normalizeRedundantRichTextAttributes,
    onKeyDown: (event: KeyboardEvent, editor: Editor) => {
        OnKeyDown.onHotkeyDoMarks(event, editor);
        OnKeyDown.onShiftEnterDoSoftBreak(event, editor);
        OnKeyDown.onBackspaceResetFormattingAtDocumentStart(event, editor);

        if (blocks) {
            onKeyboardDoListsFormatting(editor, event);
        }
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (blocks && isRichTextElement(element)) {
            return (
                <RichTextElement attributes={attributes} element={element}>
                    {children}
                </RichTextElement>
            );
        }

        return undefined;
    },
    renderLeaf: Text,
    rootTypes: [
        ElementType.HEADING_ONE,
        ElementType.HEADING_TWO,
    ],
    withOverrides(editor) {
        const overrides: WithOverrides[] = [
            withResetFormattingOnBreak,
            blocks ? withListsFormatting : identity,
        ];
        return flow(overrides)(editor);
    },
});
