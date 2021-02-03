import { PlaceholderNode } from '@prezly/slate-types';
import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    node: PlaceholderNode;
}

const Placeholder: FunctionComponent<Props> = ({ children }) => <>{children}</>;

export default Placeholder;
