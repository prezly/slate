import React from 'react';
import type { TableNode } from 'slate-tables/lib/nodes';

interface Props {
    table: TableNode;
}

export const TableContext = React.createContext(undefined as unknown as Props);
