import { EditorCommands } from '@prezly/slate-commons';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSlate } from 'slate-react';

import { Menu } from '../../../../components';
import {
    FormatBold,
    FormatItalic,
    Link,
    FormatStyleNormal,
    FormatStyleSubscript,
    FormatStyleSuperscript,
    FormatUnderline,
} from '../../../../icons';
import { toggleBlock } from '../../lib';
import type { BlockType, RichFormattingExtensionParameters } from '../../types';
import { ElementType, MarkType } from '../../types';
import BlockDropdown from '../BlockDropdown';
import MenuButton from '../MenuButton';

import './RichFormattingToolbar.scss';

interface Props {
    activeNodeType: BlockType | null;
    onLinkClick: () => void;
    parameters: RichFormattingExtensionParameters;
}

const RichFormattingToolbar: FunctionComponent<Props> = ({
    activeNodeType,
    onLinkClick,
    parameters,
}) => {
    const editor = useSlate();
    const isSuperScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUPERSCRIPT);
    const isSubScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUBSCRIPT);

    const handleSubSupClick = () => {
        if (isSuperScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT);
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT);
        } else if (isSubScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT);
        } else {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT);
        }
    };

    const handleBlockChange = (type: BlockType) => {
        if (type === 'multiple') {
            return;
        }

        toggleBlock(editor, type);
    };

    return (
        <>
            <Menu.ButtonGroup>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.BOLD)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.BOLD)}
                    type={MarkType.BOLD}
                >
                    <FormatBold className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.ITALIC)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.ITALIC)}
                    type={MarkType.ITALIC}
                >
                    <FormatItalic className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.UNDERLINED)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.UNDERLINED)}
                    type={MarkType.UNDERLINED}
                >
                    <FormatUnderline className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>

                <Menu.Button
                    active={isSuperScriptActive || isSubScriptActive}
                    onMouseDown={handleSubSupClick}
                >
                    {isSubScriptActive && (
                        <FormatStyleSubscript className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                    {isSuperScriptActive && (
                        <FormatStyleSuperscript className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                    {!(isSuperScriptActive || isSubScriptActive) && (
                        <FormatStyleNormal className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                </Menu.Button>
            </Menu.ButtonGroup>

            {parameters.links && (
                <Menu.ButtonGroup>
                    <MenuButton
                        isActive={EditorCommands.isBlockActive(editor, ElementType.LINK)}
                        onClick={onLinkClick}
                        type={ElementType.LINK}
                    >
                        <Link className="editor-v4-rich-formatting-toolbar__icon" />
                    </MenuButton>
                </Menu.ButtonGroup>
            )}

            {parameters.blocks && (
                <BlockDropdown onChange={handleBlockChange} value={activeNodeType} />
            )}
        </>
    );
};

export default RichFormattingToolbar;
