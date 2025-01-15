import { EditorCommands } from '@prezly/slate-commons';
import { TablesEditor } from '@prezly/slate-tables';
import type { Alignment, LinkNode } from '@prezly/slate-types';
import { HeadingRole, isLinkNode, LINK_NODE_TYPE } from '@prezly/slate-types';
import { type Range, RangeApi, type SlateEditor } from '@udecode/plate';
import { useEditorState } from '@udecode/plate/react';
import React, { useEffect } from 'react';
import type { Modifier } from 'react-popper';

import { Menu, TextSelectionPortalV2 } from '#components';

import { decorateSelectionFactory } from '#extensions/decorate-selection';
import { unwrapLink, wrapInLink } from '#extensions/inline-links';
import type { InlineLinksExtensionConfiguration } from '#extensions/inline-links';
import { MarkType } from '#extensions/text-styling';
import { useDecorationFactory } from '#modules/decorations';
import { EventsEditor } from '#modules/events';
import { toggleBlock } from '#modules/rich-formatting-menu';

import { Toolbar } from './components';
import {
    convertLink,
    getCurrentFormatting,
    isSelectionSupported,
    keepToolbarInTextColumn,
    useRangeRef,
} from './lib';
import { LinkMenu } from './LinkMenu';
import styles from './RichFormattingMenu.module.scss';
import type { FetchOEmbedFn, Formatting, Presentation } from './types';

interface Props {
    availableWidth: number;
    containerElement: HTMLElement | null;
    defaultAlignment: Alignment;
    withAlignment: boolean;
    withBlockquotes: boolean;
    withCallouts: boolean;
    withConversionOptions?: false | { fetchOembed: FetchOEmbedFn };
    withHeadings: boolean;
    withInlineLinks: boolean | InlineLinksExtensionConfiguration;
    withLists: boolean;
    withNewTabOption: boolean;
    withTextHighlight: boolean;
    withParagraphs: boolean;
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

const LINK_MENU_FLIP_MODIFIER: Modifier<'flip'> = {
    name: 'flip',
    enabled: true,
};

export function RichFormattingMenu({
    availableWidth,
    containerElement,
    defaultAlignment,
    withAlignment,
    withBlockquotes,
    withCallouts,
    withConversionOptions = false,
    withHeadings,
    withInlineLinks,
    withLists,
    withNewTabOption,
    withTextHighlight,
    withParagraphs,
}: Props) {
    const editor = useEditorState();

    const show = isSelectionSupported(editor);
    const [linkRange, setLinkRange, clearLinkRange] = useRangeRef();
    const link = linkRange?.current ? getCurrentLinkNode(editor, { at: linkRange.current }) : null;

    const alignment = EditorCommands.getAlignment(editor, defaultAlignment);
    const isBoldActive = EditorCommands.isMarkActive(editor, MarkType.BOLD);
    const isHighlightActive = EditorCommands.isMarkActive(editor, MarkType.HIGHLIGHTED);
    const isItalicActive = EditorCommands.isMarkActive(editor, MarkType.ITALIC);
    const isUnderlineActive = EditorCommands.isMarkActive(editor, MarkType.UNDERLINED);
    const isSuperScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUPERSCRIPT);
    const isSubScriptActive = EditorCommands.isMarkActive(editor, MarkType.SUBSCRIPT);
    const isLinkActive = EditorCommands.isBlockActive(editor, LINK_NODE_TYPE);
    const formatting = getCurrentFormatting(editor);

    function handleSubSupClick() {
        if (isSuperScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT, false);
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT, true);
        } else if (isSubScriptActive) {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT, false);
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT, false);
        } else {
            EditorCommands.toggleMark(editor, MarkType.SUPERSCRIPT, true);
            EditorCommands.toggleMark(editor, MarkType.SUBSCRIPT, false);
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

        const rangeRef = editor.api.rangeRef(editor.selection, {
            affinity: 'inward',
        });

        setLinkRange(rangeRef);

        // We have to blur the editor to allow the LinkMenu input focus.
        editor.tf.blur();
    }

    function linkSelection(props: Pick<LinkNode, 'href' | 'new_tab'>) {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        editor.tf.focus();

        unwrapLink(editor);
        wrapInLink(editor, props);
    }

    function unlinkSelection() {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        editor.tf.select(selection);
        editor.tf.focus();

        unwrapLink(editor);
    }

    function onClose() {
        const selection = linkRange?.current;
        if (!selection) return;

        clearLinkRange();

        editor.tf.focus();
        editor.tf.collapse({ edge: 'anchor' });
        editor.tf.select(selection);
    }

    useEffect(
        function () {
            if (editor.selection && RangeApi.isCollapsed(editor.selection) && linkRange?.current) {
                clearLinkRange();
            }
        },
        [editor.selection],
    );

    useDecorationFactory(linkRange?.current ? decorateSelectionFactory : undefined);

    const handleConvert =
        link && withConversionOptions && withConversionOptions.fetchOembed
            ? (to: Presentation) => {
                  convertLink(editor, link, to, withConversionOptions.fetchOembed);
                  EventsEditor.dispatchEvent(editor, 'link-converted', {
                      to,
                      element: link,
                  });
              }
            : undefined;

    const isInsideTable = TablesEditor.isTablesEditor(editor) && TablesEditor.isInTable(editor);
    const isInsideTableHeader = isInsideTable && TablesEditor.isHeaderCell(editor);

    const isTitleSelected = formatting.active.includes(HeadingRole.TITLE);
    const isSubtitleSelected = formatting.active.includes(HeadingRole.SUBTITLE);

    if (withInlineLinks && linkRange?.current && editor.selection && editor.api.isExpanded()) {
        return (
            <TextSelectionPortalV2
                containerElement={containerElement}
                modifiers={[LINK_MENU_OFFSET_MODIFIER, LINK_MENU_FLIP_MODIFIER]}
                modifySelectionRect={getTextSelectionLeftTopCornerRect}
                placement="bottom-start"
                arrowClassName={styles.LinkMenu}
            >
                <LinkMenu
                    node={link}
                    canUnlink={link !== null}
                    withConversionOptions={isInsideTable ? false : withConversionOptions}
                    withNewTabOption={withNewTabOption}
                    onBlur={clearLinkRange}
                    onChange={linkSelection}
                    onConvert={handleConvert}
                    onClose={onClose}
                    onUnlink={unlinkSelection}
                    predefinedLinks={
                        typeof withInlineLinks === 'object'
                            ? withInlineLinks.predefinedLinks
                            : undefined
                    }
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
                    isHighlight={isHighlightActive}
                    isItalic={isItalicActive}
                    isUnderline={isUnderlineActive}
                    isSubScript={isSubScriptActive}
                    isSuperScript={isSuperScriptActive}
                    isLink={isLinkActive}
                    formatting={formatting.aggregate}
                    // callbacks
                    onAlignment={handleAlignmentChange}
                    onBold={() => EditorCommands.toggleMark(editor, MarkType.BOLD)}
                    onHighlight={() => EditorCommands.toggleMark(editor, MarkType.HIGHLIGHTED)}
                    onItalic={() => EditorCommands.toggleMark(editor, MarkType.ITALIC)}
                    onUnderline={() => EditorCommands.toggleMark(editor, MarkType.UNDERLINED)}
                    onSubSuperScript={handleSubSupClick}
                    onFormatting={handleFormattingChange}
                    onLink={handleLinkButtonClick}
                    // text style
                    withBold={!isInsideTableHeader}
                    withHighlight={withTextHighlight}
                    withItalic
                    withUnderline
                    // formatting
                    withFormatting={isTitleSelected || isSubtitleSelected ? 'readonly' : true}
                    withAlignment={withAlignment}
                    withBlockquotes={withBlockquotes && !isInsideTable}
                    withCallouts={withCallouts}
                    withHeadings={withHeadings && !isInsideTable}
                    withInlineLinks={
                        isTitleSelected || isSubtitleSelected ? false : Boolean(withInlineLinks)
                    }
                    withLists={withLists}
                    withParagraphs={withParagraphs}
                    withTitle={formatting.aggregate === HeadingRole.TITLE}
                    withSubtitle={formatting.aggregate === HeadingRole.SUBTITLE}
                />
            </Menu.Toolbar>
        </TextSelectionPortalV2>
    );
}

function getCurrentLinkNode(editor: SlateEditor, options: { at: Range }): LinkNode | null {
    const entries = Array.from(editor.api.nodes<LinkNode>({ match: isLinkNode, at: options.at }));
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
