import { ProgressPromise } from '@prezly/progress-promise';
import { noop } from 'lodash-es';
import * as React from 'react';
import { createEditor as createSlateEditor } from 'slate';
import { type RenderElementProps, Slate } from 'slate-react';

import { PlaceholdersExtension } from '#extensions/placeholders';
import { createEditor } from '#modules/editor';

import { LOADER_NODE_TYPE } from '../constants';
import { loaderPromiseManager } from '../lib';
import type { LoaderNode } from '../types';
import { LoaderContentType } from '../types';

import { LoaderElement } from '#extensions/loader/components/LoaderElement';

const extensions = [PlaceholdersExtension()];
const editor = createEditor(createSlateEditor(), () => extensions);

const attributes: RenderElementProps['attributes'] = {
    'data-slate-node': 'element',
    'data-slate-void': true,
    ref: () => null,
};

export default {
    title: 'Extensions/Loaders/Loader',
    decorators: [
        (Story: React.ComponentType) => (
            <Slate editor={editor} value={[]}>
                <div style={{ width: 680 }}>
                    <Story />
                </div>
            </Slate>
        ),
    ],
};

export function Attachment() {
    const ID = 'attachment';
    const loader: LoaderNode = {
        type: LOADER_NODE_TYPE,
        id: ID,
        contentType: LoaderContentType.ATTACHMENT,
        children: [{ text: '' }],
        message: 'Uploading Attachment',
    };

    const promise = new ProgressPromise(async (_resolve, _reject, progress) => {
        for (let i = 0; i < 100; i++) {
            await delay(500);
            progress(i);
        }
    });

    loaderPromiseManager.track(ID, promise);

    return (
        <LoaderElement attributes={attributes} element={loader} onMount={noop} onUnmount={noop}>
            {''}
        </LoaderElement>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
