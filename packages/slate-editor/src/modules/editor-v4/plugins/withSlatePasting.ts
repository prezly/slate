/* eslint-disable no-param-reassign */

import { decodeSlateFragment } from '@prezly/slate-commons';
import { isFragment } from '@prezly/slate-types';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { createDataTransfer } from '../lib';

const withoutSlateFragment = (data: DataTransfer): DataTransfer => {
    const types = data.types.filter((type) => type !== 'application/x-slate-fragment');
    const dataMap = Object.fromEntries(types.map((type) => [type, data.getData(type)]));
    return createDataTransfer(dataMap);
};

const withSlatePasting = <T extends ReactEditor>(editor: T) => {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const slateFragment = data.getData('application/x-slate-fragment');

        if (slateFragment) {
            const fragment = decodeSlateFragment(slateFragment);
            const isPrezlyFragment = isFragment(fragment);

            if (isPrezlyFragment) {
                Editor.insertFragment(editor, fragment);
            } else {
                editor.insertData(withoutSlateFragment(data));
            }

            return;
        }

        insertData(data);
    };

    return editor;
};

export default withSlatePasting;
