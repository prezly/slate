import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { createDataTransfer, decodeSlateFragment } from '#lib';

import { isFragment as isValidFragment } from './isFragment';

export function withSlatePasting<T extends Editor>(editor: T) {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const slateFragment = data.getData('application/x-slate-fragment');

        if (slateFragment) {
            const fragment = decodeSlateFragment(slateFragment);

            if (isValidFragment(fragment)) {
                if (editor.selection) {
                    Transforms.insertFragment(editor, fragment);
                } else {
                    Transforms.insertNodes(editor, fragment);
                }
            } else {
                editor.insertData(withoutSlateFragmentData(data));
            }

            return;
        }

        insertData(data);
    };

    return editor;
}

function withoutSlateFragmentData(data: DataTransfer): DataTransfer {
    const types = data.types.filter((type) => type !== 'application/x-slate-fragment');
    const dataMap = Object.fromEntries(types.map((type) => [type, data.getData(type)]));
    return createDataTransfer(dataMap);
}
