import { TablesEditor } from '@prezly/slate-tables';
import { isTableCellNode, isTableNode, isTableRowNode } from '@prezly/slate-types';
import { omit } from 'lodash-es';
import type { Path } from 'slate';
import { Node, Transforms } from 'slate';
import { Editor } from 'slate';

export function normalizeTableData(editor: Editor, path: Path) {
    const table = Node.get(editor, path);

    if (!isTableNode(table) || !TablesEditor.isTablesEditor(editor)) {
        return false;
    }

    const grid: typeof table = { ...table, children: [] };
    let hasChanges = false;
    let rowIdx = 0;

    table.children.forEach((row) => {
        if (!isTableRowNode(row)) {
            return;
        }

        const cells = row.children;
        let colIdx = 0;

        cells.forEach((cell) => {
            if (!isTableCellNode(cell)) {
                return;
            }

            let colSpanIdx = 0;
            const cellRowspan = cell.rowspan ?? 1;

            for (let spanIdx = rowIdx; spanIdx < rowIdx + cellRowspan; spanIdx++) {
                if (!grid.children[spanIdx]) {
                    grid.children[spanIdx] = { ...row, children: [] };
                }

                const cellColspan = cell.colspan ?? 1;

                for (colSpanIdx = 0; colSpanIdx < cellColspan; colSpanIdx++) {
                    // Insert cell at first empty position
                    let i = 0;

                    while (grid.children[spanIdx]?.children[colIdx + colSpanIdx + i]) {
                        i++;
                    }

                    const fakeCell = colSpanIdx > 0 || spanIdx !== rowIdx;
                    const y = spanIdx;
                    const x = colIdx + colSpanIdx + i;

                    if (fakeCell) {
                        grid.children[y].children[x] = TablesEditor.createTableCell(editor) as any;
                        hasChanges = true;
                    } else {
                        let pureCell = cell;

                        if ('colspan' in pureCell) {
                            pureCell = omit(pureCell, 'colspan');
                        }

                        if ('rowspan' in pureCell) {
                            pureCell = omit(pureCell, 'rowspan');
                        }

                        grid.children[y].children[x] = pureCell;
                    }
                }
            }

            colIdx += colSpanIdx;
        });

        rowIdx += 1;
    });

    if (hasChanges) {
        Editor.withoutNormalizing(editor, () => {
            Transforms.removeNodes(editor, { at: path, match: (n) => n === table });
        });

        Transforms.insertNodes(editor, grid, { at: path });
        return true;
    }

    return false;
}
