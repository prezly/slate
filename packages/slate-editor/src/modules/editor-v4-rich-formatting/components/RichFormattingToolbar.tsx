import { EditorCommands } from '@prezly/slate-commons';
import { Alignment } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSlate } from 'slate-react';

import { Menu } from '#components';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    FormatBold,
    FormatItalic,
    Link,
    FormatStyleNormal,
    FormatStyleSubscript,
    FormatStyleSuperscript,
    FormatUnderline,
} from '#icons';

import { toggleBlock } from '../lib';
import type { BlockType, RichFormattingExtensionParameters } from '../types';
import { ElementType, MarkType } from '../types';

import { BlockDropdown } from './BlockDropdown';

interface Props {
    activeNodeType: BlockType | null;
    alignmentControls: boolean;
    defaultAlignment: Alignment;
    onLinkClick: () => void;
    parameters: RichFormattingExtensionParameters;
}

export const RichFormattingToolbar: FunctionComponent<Props> = ({
    activeNodeType,
    alignmentControls,
    defaultAlignment,
    onLinkClick,
    parameters,
}) => {
    const editor = useSlate();
    const isSuperScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUPERSCRIPT);
    const isSubScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUBSCRIPT);
    const alignment = EditorCommands.getAlignment(editor, defaultAlignment);

    const isCenterAlignmentActive = alignment.includes(Alignment.CENTER);
    const isLeftAlignmentActive = alignment.includes(Alignment.LEFT);
    const isRightAlignmentActive = alignment.includes(Alignment.RIGHT);

    function handleSubSupClick() {
        if (isSuperScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT);
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT);
        } else if (isSubScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT);
        } else {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT);
        }
    }

    function handleBlockChange(type: BlockType) {
        if (type === 'multiple') {
            return;
        }

        toggleBlock(editor, type);
    }

    function toggleAlignment(align: Alignment): void {
        EditorCommands.toggleAlignment(editor, align === defaultAlignment ? undefined : align);
    }

    return (
        <>
            <Menu.ButtonGroup>
                <Menu.Button
                    active={EditorCommands.isMarkActive(editor, MarkType.BOLD)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.BOLD)}
                >
                    <Menu.Icon icon={FormatBold} />
                </Menu.Button>
                <Menu.Button
                    active={EditorCommands.isMarkActive(editor, MarkType.ITALIC)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.ITALIC)}
                >
                    <Menu.Icon icon={FormatItalic} />
                </Menu.Button>
                <Menu.Button
                    active={EditorCommands.isMarkActive(editor, MarkType.UNDERLINED)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.UNDERLINED)}
                >
                    <Menu.Icon icon={FormatUnderline} />
                </Menu.Button>

                <Menu.Button
                    active={isSuperScriptActive || isSubScriptActive}
                    onMouseDown={handleSubSupClick}
                >
                    {isSubScriptActive && <Menu.Icon icon={FormatStyleSubscript} />}
                    {isSuperScriptActive && <Menu.Icon icon={FormatStyleSuperscript} />}
                    {!(isSuperScriptActive || isSubScriptActive) && (
                        <Menu.Icon icon={FormatStyleNormal} />
                    )}
                </Menu.Button>
            </Menu.ButtonGroup>

            {alignmentControls && (
                <Menu.ButtonGroup>
                    <Menu.Button
                        active={isLeftAlignmentActive}
                        onClick={() => toggleAlignment(Alignment.LEFT)}
                    >
                        <Menu.Icon icon={AlignLeft} />
                    </Menu.Button>
                    <Menu.Button
                        active={isCenterAlignmentActive}
                        onClick={() => toggleAlignment(Alignment.CENTER)}
                    >
                        <Menu.Icon icon={AlignCenter} />
                    </Menu.Button>
                    <Menu.Button
                        active={isRightAlignmentActive}
                        onClick={() => toggleAlignment(Alignment.RIGHT)}
                    >
                        <Menu.Icon icon={AlignRight} />
                    </Menu.Button>
                </Menu.ButtonGroup>
            )}

            {parameters.links && (
                <Menu.ButtonGroup>
                    <Menu.Button
                        active={EditorCommands.isBlockActive(editor, ElementType.LINK)}
                        onClick={onLinkClick}
                    >
                        <Menu.Icon icon={Link} />
                    </Menu.Button>
                </Menu.ButtonGroup>
            )}

            {parameters.blocks && (
                <BlockDropdown onChange={handleBlockChange} value={activeNodeType} />
            )}
        </>
    );
};
