import { Transforms } from 'slate';

import { isLoaderElement } from '../../../../modules/editor-v4-loader';

import { Transform } from './types';

const withoutLoaderBlocks: Transform = (editor): void => {
    Transforms.removeNodes(editor, {
        at: [],
        match: isLoaderElement,
    });
};

export default withoutLoaderBlocks;
