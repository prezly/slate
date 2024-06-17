import { Alignment } from '@prezly/slate-types';
import React from 'react';

import { Menu } from '#components';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    FormatBold,
    FormatHighlight,
    FormatItalic,
    FormatStyleNormal,
    FormatStyleSubscript,
    FormatStyleSuperscript,
    FormatUnderline,
    Link,
} from '#icons';

import type { Formatting } from '../types';

import { FormattingDropdown } from './FormattingDropdown';

interface Props {
    // state
    alignment: Alignment[];
    formatting: Formatting;
    isBold: boolean;
    isHighlight: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isSubScript: boolean;
    isSuperScript: boolean;
    isLink: boolean;
    // callbacks
    onAlignment: (align: Alignment) => void;
    onBold: () => void;
    onHighlight: () => void;
    onItalic: () => void;
    onUnderline: () => void;
    onSubSuperScript: () => void;
    onLink: () => void;
    onFormatting: (formatting: Formatting) => void;
    // text style
    withBold: boolean;
    withHighlight: boolean;
    withItalic: boolean;
    withUnderline: boolean;
    // formatting
    withFormatting: boolean | 'readonly';
    withAlignment: boolean;
    withBlockquotes: boolean;
    withHeadings: boolean;
    withInlineLinks: boolean;
    withLists: boolean;
    withParagraphs: boolean;
    withTitle: boolean;
    withSubtitle: boolean;
}

export function Toolbar({
    // state
    alignment,
    isBold,
    isHighlight,
    isItalic,
    isUnderline,
    isSubScript,
    isSuperScript,
    isLink,
    formatting,
    // callbacks
    onAlignment,
    onBold,
    onHighlight,
    onItalic,
    onUnderline,
    onSubSuperScript,
    onLink,
    onFormatting,
    // text style
    withBold,
    withHighlight,
    withItalic,
    withUnderline,
    // formatting
    withFormatting = true,
    withAlignment,
    withBlockquotes,
    withInlineLinks,
    withHeadings,
    withLists,
    withParagraphs,
    withTitle,
    withSubtitle,
}: Props) {
    return (
        <>
            <Menu.ButtonGroup>
                {withBold && (
                    <Menu.Button active={isBold} onClick={onBold} title="Bold">
                        <Menu.Icon icon={FormatBold} />
                    </Menu.Button>
                )}
                {withItalic && (
                    <Menu.Button active={isItalic} onClick={onItalic} title="Italic">
                        <Menu.Icon icon={FormatItalic} />
                    </Menu.Button>
                )}
                {withUnderline && (
                    <Menu.Button active={isUnderline} onClick={onUnderline} title="Underlined">
                        <Menu.Icon icon={FormatUnderline} />
                    </Menu.Button>
                )}
                <Menu.Button
                    active={isSubScript || isSuperScript}
                    onMouseDown={onSubSuperScript}
                    title="Subscript/superscript"
                    aria-valuetext={
                        isSubScript ? 'subscript' : isSuperScript ? 'superscript' : 'normal'
                    }
                >
                    {isSubScript && <Menu.Icon icon={FormatStyleSubscript} />}
                    {isSuperScript && <Menu.Icon icon={FormatStyleSuperscript} />}
                    {!(isSubScript || isSuperScript) && <Menu.Icon icon={FormatStyleNormal} />}
                </Menu.Button>
                {withHighlight && (
                    <Menu.Button active={isHighlight} onClick={onHighlight} title="Highlight">
                        <Menu.Icon icon={FormatHighlight} />
                    </Menu.Button>
                )}
            </Menu.ButtonGroup>

            {withAlignment && (
                <Menu.ButtonGroup>
                    <Menu.Button
                        active={alignment.includes(Alignment.LEFT)}
                        onClick={() => onAlignment(Alignment.LEFT)}
                        title="Align left"
                    >
                        <Menu.Icon icon={AlignLeft} />
                    </Menu.Button>
                    <Menu.Button
                        active={alignment.includes(Alignment.CENTER)}
                        onClick={() => onAlignment(Alignment.CENTER)}
                        title="Align center"
                    >
                        <Menu.Icon icon={AlignCenter} />
                    </Menu.Button>
                    <Menu.Button
                        active={alignment.includes(Alignment.RIGHT)}
                        onClick={() => onAlignment(Alignment.RIGHT)}
                        title="Align right"
                    >
                        <Menu.Icon icon={AlignRight} />
                    </Menu.Button>
                </Menu.ButtonGroup>
            )}

            {withInlineLinks && (
                <Menu.ButtonGroup>
                    <Menu.Button
                        active={isLink}
                        onClick={onLink}
                        title={isLink ? 'Unlink or modify' : 'Link text'}
                    >
                        <Menu.Icon icon={Link} />
                    </Menu.Button>
                </Menu.ButtonGroup>
            )}

            {withFormatting &&
                (withBlockquotes ||
                    withHeadings ||
                    withLists ||
                    withParagraphs ||
                    withTitle ||
                    withSubtitle) && (
                    <FormattingDropdown
                        onChange={onFormatting}
                        value={formatting}
                        disabled={withFormatting === 'readonly'}
                        title="Block formatting"
                        withBlockquotes={withBlockquotes}
                        withHeadings={withHeadings}
                        withLists={withLists}
                        withParagraphs={withParagraphs}
                        withTitle={withTitle}
                        withSubtitle={withSubtitle}
                    />
                )}
        </>
    );
}
