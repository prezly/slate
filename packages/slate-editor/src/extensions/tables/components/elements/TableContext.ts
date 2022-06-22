import type { TableNode } from '@prezly/slate-types';
import React from 'react';

interface Props {
    table: TableNode;
}

export const TableContext = React.createContext(undefined as unknown as Props);
