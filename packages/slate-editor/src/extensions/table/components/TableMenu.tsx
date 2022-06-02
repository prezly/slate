import React from 'react';
import type { Editor } from 'slate';

import { ButtonGroup, InfoText, Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete } from '#icons';

import { Nodes } from '../../../slate-tables';
import { TableEditor } from '../../../slate-tables';

interface Props {
    element: Nodes.TableNode;
    editor: Editor;
    onClose: () => void;
}

export function TableMenu({ element, editor, onClose }: Props) {
    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Table settings
            </Toolbox.Header>

            <Toolbox.Section caption="Flags">
                <Toggle
                    name="borders"
                    value={element.border}
                    onChange={() => Nodes.TableNode.update(editor, { border: !element.border })}
                >
                    With borders
                </Toggle>
                <Toggle
                    name="header-row"
                    value={element.header?.some((h) => h === 'first_row')}
                    onChange={() =>
                        Nodes.TableNode.toggleTableHeader(editor, undefined, 'first_row')
                    }
                >
                    First row is a header
                </Toggle>
                <Toggle
                    name="header-column"
                    value={element.header?.some((h) => h === 'first_column')}
                    onChange={() =>
                        Nodes.TableNode.toggleTableHeader(editor, undefined, 'first_column')
                    }
                >
                    First column is a header
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Rows">
                <ButtonGroup>
                    {[
                        <Button
                            key="edit"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.insertRowAbove(editor)}
                        >
                            Insert above
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.insertRowBelow(editor)}
                        >
                            Insert below
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.removeRow(editor)}
                        >
                            Remove
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Section caption="Columns">
                <ButtonGroup>
                    {[
                        <Button
                            key="edit"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.insertColumnLeft(editor)}
                        >
                            Insert left
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.insertColumnRight(editor)}
                        >
                            Insert right
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.removeColumn(editor)}
                        >
                            Remove
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Section>
                <InfoText>
                    Actions below can work incorrectly. Use them in plain table to see what they
                    aimed to do.
                </InfoText>
            </Toolbox.Section>

            <Toolbox.Section caption="Merge cells">
                <ButtonGroup>
                    {[
                        <Button
                            key="edit"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.mergeCellLeft(editor)}
                        >
                            Left
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.mergeCellAbove(editor)}
                        >
                            Above
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.mergeCellRight(editor)}
                        >
                            Right
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.mergeCellBelow(editor)}
                        >
                            Below
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Section caption="Add cell">
                <ButtonGroup>
                    {[
                        <Button
                            key="edit"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.addCellLeft(editor)}
                        >
                            Left
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.addCellAbove(editor)}
                        >
                            Above
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.addCellRight(editor)}
                        >
                            Right
                        </Button>,
                        <Button
                            key="view"
                            variant="clear"
                            fullWidth
                            onClick={() => TableEditor.addCellBelow(editor)}
                        >
                            Below
                        </Button>,
                    ]}
                </ButtonGroup>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => TableEditor.removeTable(editor)}
                >
                    Remove table
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}
