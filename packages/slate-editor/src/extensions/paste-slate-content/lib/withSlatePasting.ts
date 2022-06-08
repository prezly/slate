import { decodeSlateFragment } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createDataTransfer } from '#lib';

import { isFragment } from './isFragment';

export function withSlatePasting<T extends Editor>(editor: T) {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const slateFragment = data.getData('application/x-slate-fragment');

        if (slateFragment) {
            const fragment = decodeSlateFragment(slateFragment);
            const isPrezlyFragment = isFragment(fragment);

            if (isPrezlyFragment) {
                Transforms.insertNodes(editor, fragment);
            } else {
                editor.insertData(withoutSlateFragmentAttribute(data));
            }

            return;
        }

        insertData(data);
    };

    return editor;
}

function withoutSlateFragmentAttribute(data: DataTransfer): DataTransfer {
    const types = data.types.filter((type) => type !== 'application/x-slate-fragment');
    const dataMap = Object.fromEntries(types.map((type) => [type, data.getData(type)]));
    return createDataTransfer(dataMap);
}
