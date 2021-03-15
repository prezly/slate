import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface Props {
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
