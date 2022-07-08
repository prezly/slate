import { TablesEditor } from '@prezly/slate-tables';
import type { TableNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { HStack, Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete, Add } from '#icons';

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

            <Toolbox.Section caption="Layout">
                <Toggle
                    name="header-row"
                    value={Boolean(element.header?.some((h) => h === 'first_row'))}
                    onChange={() => TablesEditor.toggleTableHeader(editor, undefined, 'first_row')}
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
                        onClick={() => TablesEditor.insertRowAbove(editor)}
                    >
                        Above
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TablesEditor.insertRowBelow(editor)}
                    >
                        Below
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => TablesEditor.removeRow(editor)}
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
                        onClick={() => TablesEditor.insertColumnLeft(editor)}
                    >
                        Left
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TablesEditor.insertColumnRight(editor)}
                    >
                        Right
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => TablesEditor.removeColumn(editor)}
                    />
                </HStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => TablesEditor.removeTable(editor)}
                >
                    Remove table
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}
