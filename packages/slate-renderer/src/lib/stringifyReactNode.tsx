import React, { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import striptags from 'striptags';

const stringifyReactNode = (node: ReactNode): string => {
    return striptags(renderToString(<>{node}</>));
};

export default stringifyReactNode;
