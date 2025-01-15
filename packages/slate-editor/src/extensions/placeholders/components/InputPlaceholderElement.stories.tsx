import { createPlateEditor } from '@udecode/plate-common/react';
import * as React from 'react';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholderEmbed } from '#icons';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';

import { InputPlaceholderElement } from './InputPlaceholderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor({ editor: createPlateEditor(), getExtensions: () => extensions });

const placeholder: PlaceholderNode = {
    type: PlaceholderNode.Type.EMBED,
    uuid: 'e57a4e5c-7769-4cbd-a159-a68be9373d26',
    children: [{ text: '' }],
};

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

export default {
    title: 'Extensions/Placeholders/components/InputPlaceholderElement',
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

export function Default() {
    return (
        <InputPlaceholderElement
            attributes={attributes}
            element={placeholder}
            format="card-lg"
            icon={PlaceholderEmbed}
            title="Click to insert an embed"
            description="Embed any type of web content"
            // input
            inputTitle="Embed"
            inputDescription="Insert an embed URL and hit Enter"
            inputPlaceholder="https://media.giphy.com/GIF"
            inputAction="Add embed"
            onSubmit={(value) => {
                console.log('Submitted: ', { value });
                PlaceholdersManager.deactivateAll();
            }}
            removable
        >
            {''}
        </InputPlaceholderElement>
    );
}
