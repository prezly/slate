import { type RenderElementProps } from '@udecode/plate';
import { createPlateEditor, Slate } from '@udecode/plate/react';
import * as React from 'react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';

import { StoryEmbedPlaceholderElement } from './StoryEmbedPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor({ editor: createPlateEditor(), getExtensions: () => extensions });

const placeholder: PlaceholderNode<PlaceholderNode.Type.STORY_EMBED> = {
    type: PlaceholderNode.Type.STORY_EMBED,
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
                <div style={{ width: 680, height: 400 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function StoryEmbedPlaceholder() {
    return (
        <StoryEmbedPlaceholderElement
            attributes={attributes}
            element={placeholder}
            removable
            renderPlaceholder={() => null}
        >
            {''}
        </StoryEmbedPlaceholderElement>
    );
}
