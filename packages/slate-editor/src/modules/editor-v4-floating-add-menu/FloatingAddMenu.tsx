import { EditorCommands } from '@prezly/slate-commons';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import type { Modifier } from 'react-popper';
import { useSlate } from 'slate-react';

import { KeyboardKey, TooltipV2 } from '../../components';
import { FloatingContainer } from '../../modules/editor-v4-components';

import { Dropdown, Input } from './components';
import './FloatingAddMenu.scss';
import { useMenu } from './lib';
import type { FloatingAddMenuParameters } from './types';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    onToggle: (isShown: boolean) => void;
    parameters: FloatingAddMenuParameters;
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

export const FloatingAddMenu: FunctionComponent<Props> = ({
    availableWidth,
    containerRef,
    onToggle,
    parameters,
    showTooltipByDefault,
}) => {
    const editor = useSlate();
    const [
        { currentIndex, open, options, query },
        { onInputBlur, onInputKeyDown, onMenuClose, onMenuToggle, onQueryChange, onSelectItem },
    ] = useMenu(parameters.options, onToggle);
    const show = EditorCommands.isCursorInEmptyParagraph(editor);

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className="editor-v4-floating-add-menu"
            containerRef={containerRef}
            onClose={onMenuClose}
            open={open}
            pointerEvents={false}
            show={show}
        >
            <TooltipV2.Tooltip
                autoUpdatePosition
                defaultShow={showTooltipByDefault}
                enabled={parameters.tooltip && !open}
                flip={TOOLTIP_FLIP_MODIFIER}
                placement={parameters.tooltip?.placement}
                tooltip={parameters.tooltip?.title}
            >
                {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                    <FloatingContainer.Button
                        {...ariaAttributes}
                        className="editor-v4-floating-add-menu__button"
                        onClick={onMenuToggle}
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
                    Start typing or use <KeyboardKey>+</KeyboardKey> to add content.
                </p>
            )}
            {open && (
                <>
                    <Input
                        autoFocus
                        className="editor-v4-floating-add-menu__input"
                        onBlur={onInputBlur}
                        onChange={onQueryChange}
                        onKeyDown={onInputKeyDown}
                        placeholder="Select the type of content you want to add"
                        tabIndex={-1}
                        value={query}
                    />
                    <Dropdown
                        className="editor-v4-floating-add-menu__dropdown"
                        components={options}
                        currentIndex={currentIndex}
                        onItemClick={onSelectItem}
                        open={open}
                    />
                </>
            )}
        </FloatingContainer.Container>
    );
};
