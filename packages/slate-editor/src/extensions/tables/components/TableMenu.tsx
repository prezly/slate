import { TablesEditor } from '@prezly/slate-tables';
import type { TableNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { HStack, Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete, Add } from '#icons';

import { EventsEditor } from '#modules/events';

interface Props {
    element: TableNode;
    onClose: () => void;
}

export function TableMenu({ element, onClose }: Props) {
    const editor = useSlateStatic();

    if (!TablesEditor.isTablesEditor(editor)) {
        return null;
    }

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Table settings
            </Toolbox.Header>

            <Toolbox.Section caption="Layout">
                <Toggle
                    name="header-row"
                    value={Boolean(element.header?.some((h) => h === 'first_row'))}
                    onChange={() => {
                        const header = TablesEditor.toggleTableHeader(
                            editor,
                            undefined,
                            'first_row',
                        );

                        if (header) {
                            EventsEditor.dispatchEvent(editor, 'table-toggle-header', {
                                headerType: 'first_row',
                                newValue: header.includes('first_row'),
                            });
                        }
                    }}
                >
                    First row as header
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Rows">
                <HStack spacing="1">
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => {
                            TablesEditor.insertRowAbove(editor);
                            EventsEditor.dispatchEvent(editor, 'table-insert-row-above');
                        }}
                    >
                        Above
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => {
                            TablesEditor.insertRowBelow(editor);
                            EventsEditor.dispatchEvent(editor, 'table-insert-row-below');
                        }}
                    >
                        Below
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => {
                            TablesEditor.removeRow(editor);
                            EventsEditor.dispatchEvent(editor, 'table-remove-row');
                        }}
                    />
                </HStack>
            </Toolbox.Section>

            <Toolbox.Section caption="Columns">
                <HStack spacing="1">
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => {
                            TablesEditor.insertColumnLeft(editor);
                            EventsEditor.dispatchEvent(editor, 'table-insert-column-left');
                        }}
                    >
                        Left
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => {
                            TablesEditor.insertColumnRight(editor);
                            EventsEditor.dispatchEvent(editor, 'table-insert-column-right');
                        }}
                    >
                        Right
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => {
                            TablesEditor.removeColumn(editor);
                            EventsEditor.dispatchEvent(editor, 'table-remove-column');
                        }}
                    />
                </HStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => {
                        TablesEditor.removeTable(editor);
                        EventsEditor.dispatchEvent(editor, 'table-remove');
                    }}
                >
                    Remove table
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}
