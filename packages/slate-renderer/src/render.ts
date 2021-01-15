import { ReactNode } from 'react';
import { DocumentNode } from '@prezly/slate-types';

import { Options } from './types';

const render = (documentNode: DocumentNode, options?: Options): ReactNode => {
    console.log(documentNode, options);
    return null;
};

export default render;
