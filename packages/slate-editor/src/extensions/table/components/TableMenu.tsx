import React from 'react';
import type { Editor } from 'slate';

import { Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete, ExternalLink } from '#icons';

import { Nodes } from '../../../slate-tables';
import { TableEditor } from '../../../slate-tables';

interface Props {
    element: Nodes.TableNode;
    editor: Editor;
    onClose: () => void;
}

export function TableMenu({ element, editor, onClose }: Props) {
    const isNotInTable = !TableEditor.isInTable(editor);

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Web bookmark settings
            </Toolbox.Header>
            <Toolbox.Section noPadding>
                <Button
                    type="link"
                    variant="clear"
                    href="#"
                    icon={ExternalLink}
                    iconPosition="right"
                    fullWidth
                >
                    View
                </Button>
            </Toolbox.Section>
            <Toolbox.Section caption="Preview image">
                <Toggle
                    name="borders"
                    value={element.border}
                    onChange={() => Nodes.TableNode.update(editor, { border: !element.border })}
                >
                    With borders
                </Toggle>
            </Toolbox.Section>
            <button onClick={() => TableEditor.insertTable(editor)}>Insert table</button>{' '}
            <span> | </span>
            <button onClick={() => TableEditor.insertRowAbove(editor)} disabled={isNotInTable}>
                Insert row above
            </button>{' '}
            <button onClick={() => TableEditor.insertRowBelow(editor)} disabled={isNotInTable}>
                Insert row below
            </button>{' '}
            <button onClick={() => TableEditor.removeRow(editor)} disabled={isNotInTable}>
                Remove row
            </button>{' '}
            <span> | </span>
            <button onClick={() => TableEditor.insertColumnLeft(editor)} disabled={isNotInTable}>
                Insert column left
            </button>{' '}
            <button onClick={() => TableEditor.insertColumnRight(editor)} disabled={isNotInTable}>
                Insert column right
            </button>{' '}
            <button onClick={() => TableEditor.removeColumn(editor)} disabled={isNotInTable}>
                Remove column
            </button>{' '}
            <span> | </span>
            <button onClick={() => TableEditor.splitCellLeft(editor)} disabled={isNotInTable}>
                Split cell left
            </button>{' '}
            <button onClick={() => TableEditor.splitCellAbove(editor)} disabled={isNotInTable}>
                Split cell above
            </button>{' '}
            <button onClick={() => TableEditor.splitCellRight(editor)} disabled={isNotInTable}>
                Split cell right
            </button>{' '}
            <button onClick={() => TableEditor.splitCellBelow(editor)} disabled={isNotInTable}>
                Split cell below
            </button>{' '}
            <span> | </span>
            <button onClick={() => TableEditor.mergeCellLeft(editor)} disabled={isNotInTable}>
                Merge cell left
            </button>{' '}
            <button onClick={() => TableEditor.mergeCellAbove(editor)} disabled={isNotInTable}>
                Merge cell above
            </button>{' '}
            <button onClick={() => TableEditor.mergeCellRight(editor)} disabled={isNotInTable}>
                Merge cell right
            </button>{' '}
            <button onClick={() => TableEditor.mergeCellBelow(editor)} disabled={isNotInTable}>
                Merge cell below
            </button>{' '}
            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => TableEditor.removeTable(editor, element)}
                >
                    Remove table
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}
