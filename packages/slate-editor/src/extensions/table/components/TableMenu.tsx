import { TableEditor } from '@prezly/slate-tables';
import type { TableNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { ButtonGroup, Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete } from '#icons';

interface Props {
    element: TableNode;
    onClose: () => void;
}

export function TableMenu({ element, onClose }: Props) {
    const editor = useSlateStatic();

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Table settings
            </Toolbox.Header>

            <Toolbox.Section caption="Flags">
                <Toggle
                    name="borders"
                    value={element.border}
                    onChange={() => TableEditor.updateTable(editor, { border: !element.border })}
                >
                    With borders
                </Toggle>
                <Toggle
                    name="header-row"
                    value={element.header?.some((h) => h === 'first_row')}
                    onChange={() => TableEditor.toggleTableHeader(editor, undefined, 'first_row')}
                >
                    First row is a header
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
