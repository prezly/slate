import type { OEmbedInfo } from '@prezly/sdk';
import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { EmbedPlaceholderElement } from './EmbedPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createSlateEditor(), () => extensions);

const placeholder: PlaceholderNode<PlaceholderNode.Type.EMBED> = {
    type: PlaceholderNode.Type.EMBED,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

function failOembed(): Promise<OEmbedInfo> {
    return Promise.reject(new Error('Embeds are not enabled'));
}

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

export function EmbedPlaceholder() {
    return (
        <EmbedPlaceholderElement
            attributes={attributes}
            element={placeholder}
            fetchOembed={failOembed}
            removable
        >
            {''}
        </EmbedPlaceholderElement>
    );
}
