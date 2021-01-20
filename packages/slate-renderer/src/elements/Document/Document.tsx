import { DocumentNode } from '@prezly/slate-types';

import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Document.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    version: DocumentNode['version'];
}

const Document: FunctionComponent<Props> = ({ children, className, version, ...props }) => (
    <section
        className={classNames('prezly-slate-document', className)}
        {...props}
        data-version={version}
    >
        {children}
    </section>
);

export default Document;
