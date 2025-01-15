import { type RenderElementProps } from '@udecode/plate';
import { createPlateEditor, Slate } from '@udecode/plate/react';
import * as React from 'react';

import { PlaceholderAttachment } from '#icons';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { PlaceholderElement } from './PlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor({ editor: createPlateEditor(), getExtensions: () => extensions });

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
    title: 'Extensions/Placeholders/components/PlaceholderElement',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} initialValue={[placeholder]}>
                <div style={{ width: 680, boxSizing: 'border-box' }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function Default() {
    return (
        <PlaceholderElement
            attributes={attributes}
            element={placeholder}
            icon={PlaceholderAttachment}
            title="Click to upload an attachment"
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
            removable
        >
            {''}
        </PlaceholderElement>
    );
}

export function DropZone() {
    return (
        <PlaceholderElement
            attributes={attributes}
            element={placeholder}
            icon={PlaceholderAttachment}
            title="Drag or click to upload an attachment"
            description="Supported formats: pdf, .ppt, Keynote, .zip, .doc, etc. - Max. 25MB"
            onDrop={() => null}
            removable
        >
            {''}
        </PlaceholderElement>
    );
}
