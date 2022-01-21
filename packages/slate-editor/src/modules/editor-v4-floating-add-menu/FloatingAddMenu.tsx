import { EditorCommands } from '@prezly/slate-commons';
import classNames from 'classnames';
import type { RefObject } from 'react';
import React, { useRef, useState } from 'react';
import type { Modifier } from 'react-popper';
import { useSlate } from 'slate-react';

import { KeyboardKey, TooltipV2 } from '#components';

import { FloatingContainer } from '#modules/editor-v4-components';

import { ClassicDropdown, Input, ModernDropdown } from './components';
import './FloatingAddMenu.scss';
import {
    sortBetaOptionsLast,
    useEditorSelectionMemory,
    useKeyboardFiltering,
    useKeyboardNavigation,
    useMenuToggle,
} from './lib';
import type { Option, Settings } from './types';
import { Variant } from './types';

interface Props<Action> extends Settings {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
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

export function FloatingAddMenu<Action>({
    availableWidth,
    containerRef,
    onActivate,
    onToggle,
    options,
    showTooltipByDefault,
    tooltip,
    variant,
}: Props<Action>) {
    const editor = useSlate();
    const input = useRef<HTMLInputElement | null>(null);
    const [query, setQuery] = useState('');
    const [rememberEditorSelection, restoreEditorSelection] = useEditorSelectionMemory();
    const filteredOptions = useKeyboardFiltering(
        query,
        variant === Variant.CLASSIC ? sortBetaOptionsLast(options) : options,
    );
    const [selectedOption, onKeyDown, resetSelectedOption] = useKeyboardNavigation(
        filteredOptions,
        onSelect,
    );
    const [open, menu] = useMenuToggle({ onToggle, onOpen, onClose });

    function onOpen() {
        // If there's only one component, do not bother with the dropdown at all,
        // just select the first option immediately.
        if (filteredOptions.length === 1) {
            onSelect(filteredOptions[0]);
            return;
        }
        rememberEditorSelection();
    }

    function onClose() {
        restoreEditorSelection();
        resetSelectedOption();
        setQuery('');
    }

    function onSelect(option: Option<Action>) {
        menu.close();
        onActivate(option.action);
    }

    const show = EditorCommands.isCursorInEmptyParagraph(editor);
    const Dropdown = variant === Variant.CLASSIC ? ClassicDropdown : ModernDropdown;
    const prompt =
        variant === Variant.CLASSIC ? 'Select the type of content you want to add' : 'Search';

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className={classNames('editor-v4-floating-add-menu', {
                'editor-v4-floating-add-menu--classic': variant === Variant.CLASSIC,
                'editor-v4-floating-add-menu--modern': variant === Variant.MODERN,
            })}
            containerRef={containerRef}
            onClose={menu.close}
            open={open}
            pointerEvents={false}
            show={show}
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
                    {variant === Variant.MODERN ? (
                        <>
                            Type or press <KeyboardKey>/</KeyboardKey> to add content.
                        </>
                    ) : (
                        <>
                            Start typing or use <KeyboardKey>+</KeyboardKey> to add content.
                        </>
                    )}
                </p>
            )}
            {open && (
                <>
                    <Input
                        autoFocus
                        className="editor-v4-floating-add-menu__input"
                        onBlur={menu.close}
                        onChange={setQuery}
                        onKeyDown={open ? onKeyDown : undefined}
                        placeholder={prompt}
                        ref={input}
                        tabIndex={-1}
                        value={query}
                    />
                    <Dropdown
                        className="editor-v4-floating-add-menu__dropdown"
                        highlight={query}
                        options={filteredOptions}
                        onItemClick={onSelect}
                        open={open}
                        referenceElement={input}
                        selectedOption={selectedOption}
                    />
                </>
            )}
        </FloatingContainer.Container>
    );
}
