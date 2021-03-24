import { EditorCommands } from '@prezly/slate-commons';
import React, { FunctionComponent } from 'react';
import { useSlate } from 'slate-react';

import { FloatingMenu } from '../../../../components';
import {
    Bold,
    Italic,
    Link,
    TextStyleDefault,
    TextStyleSubscript,
    TextStyleSuperscript,
    Underline,
} from '../../../../icons';
import { toggleBlock } from '../../lib';
import { BlockType, ElementType, MarkType, RichFormattingExtensionParameters } from '../../types';
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
            <FloatingMenu.ButtonGroup>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.BOLD)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.BOLD)}
                    type={MarkType.BOLD}
                >
                    <Bold className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.UNDERLINED)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.UNDERLINED)}
                    type={MarkType.UNDERLINED}
                >
                    <Underline className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>
                <MenuButton
                    isActive={EditorCommands.isMarkActive(editor, MarkType.ITALIC)}
                    onClick={() => EditorCommands.toggleMark(editor, MarkType.ITALIC)}
                    type={MarkType.ITALIC}
                >
                    <Italic className="editor-v4-rich-formatting-toolbar__icon" />
                </MenuButton>

                <FloatingMenu.Button
                    active={isSuperScriptActive || isSubScriptActive}
                    onMouseDown={handleSubSupClick}
                >
                    {isSubScriptActive && (
                        <TextStyleSubscript className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                    {isSuperScriptActive && (
                        <TextStyleSuperscript className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                    {!(isSuperScriptActive || isSubScriptActive) && (
                        <TextStyleDefault className="editor-v4-rich-formatting-toolbar__icon" />
                    )}
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>

            {parameters.links && (
                <FloatingMenu.ButtonGroup>
                    <MenuButton
                        isActive={EditorCommands.isBlockActive(editor, ElementType.LINK)}
                        onClick={onLinkClick}
                        type={ElementType.LINK}
                    >
                        <Link className="editor-v4-rich-formatting-toolbar__icon" />
                    </MenuButton>
                </FloatingMenu.ButtonGroup>
            )}

            {parameters.blocks && (
                <BlockDropdown onChange={handleBlockChange} value={activeNodeType} />
            )}
        </>
    );
};

export default RichFormattingToolbar;
