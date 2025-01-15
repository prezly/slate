import type { OEmbedInfo } from '@prezly/sdk';
import { createPlateEditor } from '@udecode/plate-common/react';
import * as React from 'react';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { VideoPlaceholderElement } from './VideoPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor({ editor: createPlateEditor(), getExtensions: () => extensions });

const placeholder: PlaceholderNode<PlaceholderNode.Type.VIDEO> = {
    type: PlaceholderNode.Type.VIDEO,
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

export function VideoPlaceholder() {
    return (
        <VideoPlaceholderElement
            attributes={attributes}
            element={placeholder}
            fetchOembed={failOembed}
            removable
        >
            {''}
        </VideoPlaceholderElement>
    );
}

export function ShortVideoPlaceholder() {
    return (
        <VideoPlaceholderElement
            attributes={attributes}
            element={placeholder}
            fetchOembed={failOembed}
            format="card"
            removable
        >
            {''}
        </VideoPlaceholderElement>
    );
}
