import { EditorCommands } from '@prezly/slate-commons';
import { isHeadingNode, isParagraphNode } from '@prezly/slate-types';
import classNames from 'classnames';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent, RefObject } from 'react';
import React, { useState } from 'react';
import type { Modifier } from 'react-popper';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { KeyboardKey, TooltipV2 } from '#components';

import { FloatingContainer } from '#modules/editor-v4-components';

import { Input, Dropdown } from './components';
import './FloatingAddMenu.scss';
import {
    isMenuHotkey,
    shouldShowMenuButton,
    sortBetaOptionsLast,
    useEditorSelectionMemory,
    useKeyboardFiltering,
    useKeyboardNavigation,
    useMenuToggle,
} from './lib';
import type { Option, Settings } from './types';

interface Props<Action> extends Settings {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    open: boolean;
    options: Option<Action>[];
    onActivate: (action: Action) => void;
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
    onToggle,
    open,
    options,
    showTooltipByDefault,
    tooltip,
}: Props<Action>) {
    const editor = useSlate();
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
    const [input, setInput] = useState('');
    const [rememberEditorSelection, restoreEditorSelection] = useEditorSelectionMemory();
    const [query, filteredOptions] = useKeyboardFiltering(input, sortBetaOptionsLast(options));
    const [selectedOption, onKeyDown, resetSelectedOption] = useKeyboardNavigation(
        filteredOptions,
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
            restoreEditorSelection();
            resetSelectedOption();
            setInput('');
        },
    });

    function onSelect(option: Option<Action>) {
        menu.close();
        onActivate(option.action);
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
            if (filteredOptions.length === 0) {
                event.preventDefault();
                event.stopPropagation();
                console.log('inserting text', `${input} `);
                Transforms.insertText(editor, `${input} `);
                rememberEditorSelection();
                menu.close();
                return;
            }
        }

        onKeyDown(event);
    }

    const isParagraph = isParagraphNode(currentNode);
    const isHeading1 = isHeadingNode(currentNode);
    const isHeading2 = isHeadingNode(currentNode);

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={classNames('editor-v4-floating-add-menu', {
                'editor-v4-floating-add-menu--paragraph': isParagraph,
                'editor-v4-floating-add-menu--heading-one': isHeading1,
                'editor-v4-floating-add-menu--heading-two': isHeading2,
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
                tooltip={tooltip?.title}
            >
                {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                    <FloatingContainer.Button
                        {...ariaAttributes}
                        className="editor-v4-floating-add-menu__button"
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
            {!open && (
                <p className="editor-v4-floating-add-menu__placeholder">
                    Type or press <KeyboardKey>/</KeyboardKey> to add content
                </p>
            )}
            {open && (
                <>
                    <Input
                        autoFocus
                        className="editor-v4-floating-add-menu__input"
                        onBlur={menu.close}
                        onChange={setInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Search"
                        ref={setInputElement}
                        tabIndex={-1}
                        value={input}
                    />
                    <Dropdown
                        className="editor-v4-floating-add-menu__dropdown"
                        highlight={query}
                        options={filteredOptions}
                        onItemClick={onSelect}
                        open={open}
                        referenceElement={inputElement}
                        selectedOption={selectedOption}
                    />
                </>
            )}
        </FloatingContainer.Container>
    );
}
