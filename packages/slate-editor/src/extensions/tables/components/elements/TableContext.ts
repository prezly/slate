import type { TableNode } from '@prezly/slate-types';
import React from 'react';

interface Props {
    table: TableNode | null;
}

export const TableContext = React.createContext<Props>({ table: null });
