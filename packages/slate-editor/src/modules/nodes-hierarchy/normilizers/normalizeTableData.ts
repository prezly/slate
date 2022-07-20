import { Matrix, TablesEditor } from '@prezly/slate-tables';
import { isTableNode, isTableRowNode } from '@prezly/slate-types';
import { Node, Transforms } from 'slate';
import type { Editor, Path } from 'slate';

export function normalizeTableData(editor: Editor, path: Path) {
    const node = Node.get(editor, path);

    if (isTableNode(node) && TablesEditor.isTablesEditor(editor)) {
        const matrix = new Matrix(editor, [node, path]);
        let hasChanges = false;

        matrix.rows.forEach((row, i) => {
            const currentRow = node.children.at(i);

            if (currentRow && isTableRowNode(currentRow)) {
                let lengthDiff = row.cells.length - currentRow.children.length;

                while (lengthDiff > 0) {
                    const newCell = TablesEditor.createTableCell(editor);
                    currentRow.children.push(newCell as any);
                    hasChanges = true;
                    lengthDiff--;
                }
            }
        });

        node.children.forEach((row) =>
            row.children.forEach((cell) => {
                if (cell.colspan) {
                    delete cell.colspan;
                    hasChanges = true;
                }

                if (cell.rowspan) {
                    delete cell.rowspan;
                    hasChanges = true;
                }
            }),
        );

        if (hasChanges) {
            Transforms.setNodes(editor, node, {
                at: path,
                match: isTableNode,
            });
            return true;
        }
    }

    return false;
}
