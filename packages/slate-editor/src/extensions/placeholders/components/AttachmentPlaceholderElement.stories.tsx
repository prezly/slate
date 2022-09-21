import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { AttachmentPlaceholderElement } from './AttachmentPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createSlateEditor(), () => extensions);

const placeholder: PlaceholderNode = {
    type: PlaceholderNode.Type.ATTACHMENT,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

export default {
    title: 'Extensions/Placeholders/Attachment Placeholder',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} value={[]}>
                <div style={{ width: 680, boxSizing: 'border-box' }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function Default() {
    return (
        <AttachmentPlaceholderElement attributes={attributes} element={placeholder}>
            {''}
        </AttachmentPlaceholderElement>
    );
}

export function Selected() {
    return (
        <AttachmentPlaceholderElement attributes={attributes} element={placeholder} selected>
            {''}
        </AttachmentPlaceholderElement>
    );
}

export function Dragover() {
    return (
        <AttachmentPlaceholderElement attributes={attributes} dragOver element={placeholder}>
            {''}
        </AttachmentPlaceholderElement>
    );
}

export function SelectedDragover() {
    return (
        <AttachmentPlaceholderElement
            attributes={attributes}
            dragOver
            element={placeholder}
            selected
        >
            {''}
        </AttachmentPlaceholderElement>
    );
}
