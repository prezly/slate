import { EditorCommands } from '@prezly/slate-commons';
import type { Alignment, LinkNode } from '@prezly/slate-types';
import { isLinkNode, LINK_NODE_TYPE } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import type { Modifier } from 'react-popper';
import { Editor, Range, Transforms } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, useSlate } from 'slate-react';

import { Menu, TextSelectionPortalV2 } from '#components';

import { unwrapLink, wrapInLink } from '#modules/editor-v4-inline-links';
import { MarkType, toggleBlock } from '#modules/editor-v4-rich-formatting';

import { Toolbar } from './components';
import {
    keepToolbarInTextColumn,
    getCurrentFormatting,
    isSelectionSupported,
    useRangeRef,
} from './lib';
import { LinkMenu } from './LinkMenu';
import styles from './RichFormattingMenu.module.scss';
import type { Formatting } from './types';

interface Props {
    availableWidth: number;
    containerElement: HTMLElement | null;
    defaultAlignment: Alignment;
    withAlignment: boolean;
    withRichBlockElements: boolean;
    withLinks: boolean;
    withLinksOpenInNewTabOption?: boolean;
}

const TOOLBAR_OFFSET_MODIFIER: Modifier<'offset'> = {
    name: 'offset',
    options: {
        offset: [-12, 4],
    },
};

const LINK_MENU_OFFSET_MODIFIER: Modifier<'offset'> = {
    name: 'offset',
    options: {
        offset: [-8, 10],
    },
};

export const RichFormattingMenu: FunctionComponent<Props> = ({
    availableWidth,
    containerElement,
    defaultAlignment,
    withAlignment,
    withLinks,
    withRichBlockElements,
    withLinksOpenInNewTabOption = true,
}) => {
    const editor = useSlate();

    if (!HistoryEditor.isHistoryEditor(editor)) {
        throw new Error('RichFormattingMenu requires HistoryEditor to work');
    }

    const show = isSelectionSupported(editor);
    const [linkRange, setLinkRange, clearLinkRange] = useRangeRef();
    const link = linkRange?.current ? getCurrentLinkNode(editor, { at: linkRange.current }) : null;

    const alignment = EditorCommands.getAlignment(editor, defaultAlignment);
    const isBoldActive = EditorCommands.isMarkActive(editor, MarkType.BOLD);
    const isItalicActive = EditorCommands.isMarkActive(editor, MarkType.ITALIC);
    const isUnderlineActive = EditorCommands.isMarkActive(editor, MarkType.UNDERLINED);
    const isSuperScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUPERSCRIPT);
    const isSubScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUBSCRIPT);
    const isLinkActive = EditorCommands.isBlockActive(editor, LINK_NODE_TYPE);
    const formatting = getCurrentFormatting(editor);

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

    function handleFormattingChange(type: Formatting) {
        if (type === 'multiple') {
            return;
        }

        toggleBlock(editor, type);
    }

    function handleAlignmentChange(align: Alignment): void {
        EditorCommands.toggleAlignment(editor, align === defaultAlignment ? undefined : align);
    }

    function handleLinkButtonClick() {
        if (!editor.selection) return;

        const rangeRef = Editor.rangeRef(editor, editor.selection, {
            affinity: 'inward',
        });

        setLinkRange(rangeRef);

        // We have to blur the editor to allow the LinkMenu input focus.
        ReactEditor.blur(editor);
    }

    function linkSelection(props: Pick<LinkNode, 'href' | 'new_tab'>) {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        ReactEditor.focus(editor);

        unwrapLink(editor);
        wrapInLink(editor, props);
    }

    function unlinkSelection() {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        Transforms.select(editor, selection);
        ReactEditor.focus(editor);

        unwrapLink(editor);
    }

    function onClose() {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        ReactEditor.focus(editor);
        Transforms.collapse(editor, { edge: 'anchor' });
        Transforms.select(editor, selection);
    }

    useEffect(
        function () {
            if (editor.selection && Range.isCollapsed(editor.selection) && linkRange?.current) {
                clearLinkRange();
            }
        },
        [editor.selection],
    );

    if (withLinks && linkRange?.current && editor.selection && Range.isExpanded(editor.selection)) {
        return (
            <TextSelectionPortalV2
                containerElement={containerElement}
                modifiers={[LINK_MENU_OFFSET_MODIFIER]}
                modifySelectionRect={getTextSelectionLeftTopCornerRect}
                placement="bottom-start"
                arrowClassName={styles['link-menu']}
            >
                <LinkMenu
                    node={link}
                    canUnlink={link !== null}
                    showOpenInNewTabOption={withLinksOpenInNewTabOption}
                    onBlur={clearLinkRange}
                    onChange={linkSelection}
                    onClose={onClose}
                    onUnlink={unlinkSelection}
                />
            </TextSelectionPortalV2>
        );
    }

    if (!show) {
        return null;
    }

    return (
        <TextSelectionPortalV2
            containerElement={containerElement}
            modifiers={[
                TOOLBAR_OFFSET_MODIFIER,
                keepToolbarInTextColumn({
                    editorElement: containerElement,
                    availableWidth,
                }),
            ]}
            placement="top-start"
        >
            <Menu.Toolbar className="rich-formatting-menu">
                <Toolbar
                    // state
                    alignment={alignment}
                    isBold={isBoldActive}
                    isItalic={isItalicActive}
                    isUnderline={isUnderlineActive}
                    isSubScript={isSubScriptActive}
                    isSuperScript={isSuperScriptActive}
                    isLink={isLinkActive}
                    formatting={formatting}
                    // callbacks
                    onAlignment={handleAlignmentChange}
                    onBold={() => EditorCommands.toggleMark(editor, MarkType.BOLD)}
                    onItalic={() => EditorCommands.toggleMark(editor, MarkType.ITALIC)}
                    onUnderline={() => EditorCommands.toggleMark(editor, MarkType.UNDERLINED)}
                    onSubSuperScript={handleSubSupClick}
                    onFormatting={handleFormattingChange}
                    onLink={handleLinkButtonClick}
                    // features
                    withAlignment={withAlignment}
                    withLinks={withLinks}
                    withRichBlockElements={withRichBlockElements}
                />
            </Menu.Toolbar>
        </TextSelectionPortalV2>
    );
};

function getCurrentLinkNode(editor: Editor, options: { at: Range }): LinkNode | null {
    const entries = Array.from(Editor.nodes(editor, { match: isLinkNode, at: options.at }));
    return entries.length > 0 ? entries[0][0] : null;
}

const TEXT_SELECTION_CORNER_SIZE = 24;

function getTextSelectionLeftTopCornerRect(rect: ClientRect): ClientRect | null {
    return {
        ...rect,
        width: TEXT_SELECTION_CORNER_SIZE,
        right: rect.left + TEXT_SELECTION_CORNER_SIZE,
    };
}
