import { DocumentNode } from '@prezly/slate-types';

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Document.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: DocumentNode;
}

const Document: FunctionComponent<Props> = ({ children, className, node, ...props }) => {
    const version = { node };

    return (
        <section
            className={classNames('prezly-slate-document', className)}
            data-version={version}
            {...props}
        >
            {children}
        </section>
    );
};

export default Document;
