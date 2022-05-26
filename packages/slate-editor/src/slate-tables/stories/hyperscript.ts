import type { ReactNode } from 'react';
import { createHyperscript } from 'slate-hyperscript';

import type { TableCellNode, TableNode, TableRowNode } from '../lib/nodes';

export const jsx = createHyperscript({
    elements: {
        'h-table': { type: 'table' },
        'h-tr': { type: 'table-row' },
        'h-td': { type: 'table-cell' },
        'h-paragraph': { type: 'paragraph' },
        'h-text': { text: '' },
    },
});

declare global {
    namespace JSX {
        interface IntrinsicElements {
            anchor:
                | {
                      offset?: never;
                      path?: never;
                  }
                | {
                      offset: number;
                      path: number[];
                  };
            cursor: {
                children?: never;
            };
            element: {
                [key: string]: any;
                children?: ReactNode;
                type: string;
            };
            focus:
                | {
                      offset?: never;
                      path?: never;
                  }
                | {
                      offset: number;
                      path: number[];
                  };
            selection: {
                children?: ReactNode;
            };
        }

        interface IntrinsicElements {
            // it could have been any other inline element
            'h-table': Omit<TableNode, 'children' | 'type'> & {
                children?: ReactNode;
            };
            'h-tr': Omit<TableRowNode, 'children' | 'type'> & {
                children?: ReactNode;
            };
            'h-td': Omit<TableCellNode, 'children' | 'type'> & {
                children?: ReactNode;
            };
            'h-paragraph': {
                children?: ReactNode;
            };
            'h-text': {
                bold?: boolean
                children?: ReactNode;
            };
        }
    }
}
