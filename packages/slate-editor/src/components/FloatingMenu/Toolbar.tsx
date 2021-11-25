import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

export interface Props {
    className?: string;
}

const Toolbar: FunctionComponent<Props> = ({ children, className }) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
        className={classNames('floating-menu', className)}
        onMouseDown={(event) => event.preventDefault()}
    >
        {children}
    </div>
);

export default Toolbar;
