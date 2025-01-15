import { type RenderElementProps } from '@udecode/plate';
import { createPlateEditor, Slate } from '@udecode/plate/react';
import * as React from 'react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { ImagePlaceholderElement } from './ImagePlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createPlateEditor(), () => extensions);

const placeholder: PlaceholderNode<PlaceholderNode.Type.IMAGE> = {
    type: PlaceholderNode.Type.IMAGE,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

export default {
    title: 'Extensions/Placeholders/elements',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} initialValue={[placeholder]}>
                <div style={{ width: 680 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function ImagePlaceholder() {
    return (
        <ImagePlaceholderElement
            attributes={attributes}
            element={placeholder}
            withCaptions
            withMediaGalleryTab={false}
            removable
        >
            {''}
        </ImagePlaceholderElement>
    );
}
