import type { CoverageEntry } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import { CoverageLayout } from '@prezly/slate-types';
import { useEditorRef } from '@udecode/plate-common/react';
import classNames from 'classnames';
import React from 'react';
import { useSelected } from 'slate-react';

import type { OptionsGroupOption } from '#components';
import { Button, OptionsGroup, Toggle, Toolbox } from '#components';
import { Delete, ExternalLink, ItemsLayoutHorizontal, ItemsLayoutVertical } from '#icons';

import { getCoverageImageUrl, updateCoverage } from '../lib';

import styles from './CoverageMenu.module.scss';

interface Props {
    coverage: CoverageEntry;
    element: CoverageNode;
    onEdit: () => void;
    onRemove: () => void;
    withLayoutOptions: boolean;
}

const LAYOUT_OPTIONS: OptionsGroupOption<CoverageLayout>[] = [
    {
        label: 'Vertical',
        value: CoverageLayout.VERTICAL,
        icon: ({ isActive }) => (
            <ItemsLayoutVertical
                className={classNames(styles.OptionIcon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        label: 'Horizontal',
        value: CoverageLayout.HORIZONTAL,
        icon: ({ isActive }) => (
            <ItemsLayoutHorizontal
                className={classNames(styles.OptionIcon, { [styles.active]: isActive })}
            />
        ),
    },
];

export function CoverageMenu({
    coverage,
    element,
    onEdit,
    onRemove,
    withLayoutOptions,
}: Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    const imageUrl = getCoverageImageUrl(coverage);
    const isLayoutChangeable = imageUrl && element.show_thumbnail;
    const activeLayout = isLayoutChangeable ? element.layout : CoverageLayout.VERTICAL;

    return (
        <>
            <Toolbox.Header>Coverage card settings</Toolbox.Header>

            <Toolbox.Section caption="Preview image">
                <Toggle
                    disabled={!imageUrl}
                    name="show_thumbnail"
                    value={element.show_thumbnail}
                    onChange={(show_thumbnail) => updateCoverage(editor, { show_thumbnail })}
                >
                    Show preview image
                </Toggle>
            </Toolbox.Section>

            {withLayoutOptions && (
                <Toolbox.Section caption="Card layout">
                    <OptionsGroup<CoverageLayout>
                        columns={3}
                        disabled={!isLayoutChangeable}
                        name="layout"
                        onChange={(layout) => updateCoverage(editor, { layout })}
                        options={LAYOUT_OPTIONS}
                        selectedValue={activeLayout}
                    />
                </Toolbox.Section>
            )}

            <Toolbox.Section caption="Link">
                <Toggle
                    name="new_tab"
                    value={element.new_tab}
                    onChange={(new_tab) => updateCoverage(editor, { new_tab })}
                >
                    Open in new tab
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section noPadding>
                <Button
                    icon={ExternalLink}
                    iconPosition="right"
                    fullWidth
                    onClick={onEdit}
                    variant="clear"
                >
                    Edit coverage
                </Button>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear" icon={Delete} fullWidth onMouseDown={onRemove}>
                    Remove
                </Button>
            </Toolbox.Footer>
        </>
    );
}
