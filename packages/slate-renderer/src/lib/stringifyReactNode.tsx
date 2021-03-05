import React, { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import striptags from 'striptags';

const stringifyReactNode = (node?: ReactNode): string => {
    return striptags(renderToStaticMarkup(<>{node}</>));
};

export default stringifyReactNode;
