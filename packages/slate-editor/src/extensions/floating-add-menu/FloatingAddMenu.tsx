import { EditorCommands } from '@prezly/slate-commons';
import {
    HEADING_1_NODE_TYPE,
    HEADING_2_NODE_TYPE,
    isHeadingNode,
    isParagraphNode,
} from '@prezly/slate-types';
import { useEditorRef } from '@udecode/plate-common/react';
import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent, RefObject } from 'react';
import React, { useEffect, useState } from 'react';
import type { Modifier } from 'react-popper';
import { Node } from 'slate';

import { TooltipV2 } from '#components';
import { useKeyboardNavigation, useSize } from '#lib';

import { FloatingContainer } from '#modules/components';

import { Input, Dropdown, Plus } from './components';
import styles from './FloatingAddMenu.module.scss';
import {
    isMenuHotkey,
    prependSuggestions,
    shouldShowMenuButton,
    sortBetaOptionsLast,
    useEditorSelectionMemory,
    useKeyboardFiltering,
    useMenuToggle,
} from './lib';
import type { Option, ExtensionConfiguration } from './types';

interface Props<Action> extends ExtensionConfiguration {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    open: boolean;
    options: Option<Action>[];
    onActivate: (option: Option<Action>, query: string) => void;
    onFilter?: (query: string, resultsCount: number) => void;
    onToggle: (isShown: boolean) => void;
    showTooltipByDefault: boolean;
}

const TOOLTIP_FLIP_MODIFIER: Modifier<'flip'> = {
    name: 'flip',
    options: {
        fallbackPlacements: ['bottom'],
        padding: 4,
        rootBoundary: 'document',
    },
};

const isSpacebar = isHotkey('space');

export function FloatingAddMenu<Action>({
    availableWidth,
    containerRef,
    onActivate,
    onFilter,
    onToggle,
    open,
    options,
    showTooltipByDefault,
    tooltip,
}: Props<Action>) {
    const editor = useEditorRef();
    const [sizer, { width: containerWidth }] = useSize(Sizer);
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    const [input, setInput] = useState('');
    const [rememberEditorSelection, restoreEditorSelection] = useEditorSelectionMemory();

    const [query, filteredOptions] = useKeyboardFiltering(input, sortBetaOptionsLast(options));
    const displayedOptions =
        query.length === 0 ? prependSuggestions(filteredOptions, 'Suggestions') : filteredOptions;
    const [selectedOption, onKeyDown, resetSelectedOption] = useKeyboardNavigation(
        displayedOptions,
        onSelect,
    );

    const menu = useMenuToggle(open, onToggle, {
        onOpen() {
            // If there's only one component, do not bother with the dropdown at all,
            // just select the first option immediately.
            if (options.length === 1) {
                onSelect(options[0]);
                return;
            }
            rememberEditorSelection();
        },
        onClose() {
            setInput('');
            restoreEditorSelection();
            resetSelectedOption();
        },
    });

    useEffect(
        function () {
            onFilter?.(query, filteredOptions.length);
        },
        [query, filteredOptions.length],
    );

    function onSelect(option: Option<Action>) {
        menu.close();
        onActivate(option, query);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (isMenuHotkey(event)) {
            event.preventDefault();
            event.stopPropagation();
            menu.close();
            return;
        }

        /**
         * An additional whitespace is inserted after the previous query
         * was already returning no results => close the menu, preserving input.
         */
        if (isSpacebar(event)) {
            if (displayedOptions.length === 0) {
                event.preventDefault();
                event.stopPropagation();
                editor.insertText(`${input} `);
                rememberEditorSelection();
                menu.close();
                return;
            }
        }

        onKeyDown(event);
    }

    const isNarrowContainer = (containerWidth ?? 1000) < 480;
    const isParagraph = isParagraphNode(currentNode);
    const isHeading1 = isHeadingNode(currentNode, HEADING_1_NODE_TYPE);
    const isHeading2 = isHeadingNode(currentNode, HEADING_2_NODE_TYPE);
    const text = currentNode ? Node.string(currentNode) : '';

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={classNames(styles['menu'], {
                [styles['menu--paragraph']]: isParagraph,
                [styles['menu--heading-one']]: isHeading1,
                [styles['menu--heading-two']]: isHeading2,
            })}
            containerRef={containerRef}
            onClose={menu.close}
            open={open}
            pointerEvents={false}
            show={shouldShowMenuButton(editor)}
        >
            <TooltipV2.Tooltip
                autoUpdatePosition
                defaultShow={showTooltipByDefault}
                enabled={tooltip && !open}
                flip={TOOLTIP_FLIP_MODIFIER}
                placement={tooltip?.placement}
                tooltip={tooltip?.content}
            >
                {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                    <FloatingContainer.Button
                        {...ariaAttributes}
                        className={styles.button}
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            menu.toggle();
                        }}
                        onMouseEnter={onShow}
                        onMouseLeave={onHide}
                        open={open}
                        ref={setReferenceElement}
                        variant="green"
                    />
                )}
            </TooltipV2.Tooltip>
            {!open && !hasOnlySpaces(text) && <Placeholder narrow={isNarrowContainer} />}
            {open && (
                <>
                    <Input
                        autoFocus
                        className={styles.input}
                        onBlur={menu.close}
                        onChange={setInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                        ref={setInputElement}
                        tabIndex={-1}
                        value={input}
                    />
                    <Dropdown
                        className={styles.dropdown}
                        highlight={query}
                        options={displayedOptions}
                        onItemClick={onSelect}
                        open={open}
                        referenceElement={inputElement}
                        selectedOption={selectedOption}
                    />
                </>
            )}
            {sizer}
        </FloatingContainer.Container>
    );
}

function hasOnlySpaces(text: string) {
    return text.length !== 0 && text.trim().length === 0;
}

function Placeholder(props: { narrow: boolean }) {
    if (props.narrow) {
        return <p className={styles.placeholder}>Click the green + button to add content</p>;
    }
    return (
        <p className={styles.placeholder}>
            Click the green <Plus /> button to add images and other content
        </p>
    );
}

function Sizer() {
    return <div />;
}
