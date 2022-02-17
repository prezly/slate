import classNames from 'classnames';
import maxSize from 'popper-max-size-modifier';
import type { ReactNode } from 'react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { MenuItem } from 'react-bootstrap';
import { usePopper } from 'react-popper';

import { FancyScrollbars } from '#components';
import { BatsIllustration, WarningCircle } from '#icons';
import { noop } from '#lodash';

import { groupOptions, isComponent } from '../lib';
import type { Option } from '../types';

import './ModernDropdown.scss';

interface Props<Action> {
    className?: string;
    highlight?: string;
    options: Option<Action>[];
    onItemClick: (option: Option<Action>) => void;
    open: boolean;
    referenceElement: HTMLElement | null;
    selectedOption: Option<Action>;
}

const POPPER_CONFIG: Parameters<typeof usePopper>[2] = {
    placement: 'bottom-start',
    modifiers: [
        {
            name: 'offset',
            enabled: true,
            options: {
                offset: [0, 6],
            },
        },
        {
            name: 'flip',
            enabled: false,
        },
        maxSize,
        {
            name: 'maxSize',
            options: {
                padding: 16,
            },
        } as typeof maxSize,
        {
            name: 'applyMaxSize',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['maxSize'],
            fn({ state }) {
                // The `maxSize` modifier provides this data
                state.styles.popper.maxHeight = `${state.modifiersData.maxSize.height}px`;
            },
        },
    ],
};

export function ModernDropdown<Action>({
    className,
    highlight,
    options,
    onItemClick,
    open,
    referenceElement,
    selectedOption,
}: Props<Action>) {
    // data
    const groups = groupOptions(options);
    const hasLabels = options.some((option) => option.isBeta || option.isNew);

    const [activeItem, setActiveItem] = useState<HTMLElement | null>(null);
    const scrollarea = useRef<FancyScrollbars | null>(null);
    const { attributes, styles } = usePopper(
        referenceElement,
        scrollarea.current?.container,
        POPPER_CONFIG,
    );

    useEffect(
        function () {
            if (activeItem) {
                scrollarea.current?.ensureVisible(activeItem, 32);
            }
        },
        [activeItem, scrollarea],
    );

    return (
        <div
            className={classNames('dropdown', 'editor-v4-floating-menu-modern-dropdown', {
                'editor-v4-floating-menu-modern-dropdown--with-labels': hasLabels,
                'editor-v4-floating-menu-modern-dropdown--no-results': options.length === 0,
                open,
            })}
        >
            <FancyScrollbars
                {...attributes.popper}
                autoHeight
                autoHeightMin={20}
                autoHeightMax={1000}
                className="editor-v4-floating-menu-modern-dropdown__scroll-area"
                ref={scrollarea}
                style={{ ...styles.popper, width: 'auto' }}
            >
                <ul
                    className={classNames(
                        'dropdown-menu',
                        'editor-v4-floating-menu-modern-dropdown__menu',
                        className,
                    )}
                    onMouseDown={(event) => event.preventDefault()}
                >
                    {options.length === 0 && (
                        <MenuItem
                            className="editor-v4-floating-menu-modern-dropdown__menu-item editor-v4-floating-menu-modern-dropdown__menu-item--no-results"
                            disabled
                            onClick={noop}
                        >
                            <div className="editor-v4-floating-menu-modern-dropdown__menu-item-icon">
                                <WarningCircle />
                            </div>
                            <div className="editor-v4-floating-menu-modern-dropdown__menu-item-text">
                                No results
                            </div>
                            <BatsIllustration className="editor-v4-floating-menu-modern-dropdown__menu-item-decoration" />
                        </MenuItem>
                    )}

                    {groups.map(({ group, options }) => (
                        <Fragment key={`group:${group}`}>
                            <MenuItem
                                className="editor-v4-floating-menu-modern-dropdown__menu-group"
                                header
                            >
                                {group}
                            </MenuItem>
                            {options.map((option) => (
                                <MenuItem
                                    active={option === selectedOption}
                                    className="editor-v4-floating-menu-modern-dropdown__menu-item"
                                    key={`option:${option.text}`}
                                    onClick={(event) => event.preventDefault()}
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        onItemClick(option);
                                    }}
                                >
                                    <div
                                        className="editor-v4-floating-menu-modern-dropdown__menu-item-icon"
                                        data-action={option.action}
                                    >
                                        {isComponent(option.icon) ? <option.icon /> : option.icon}
                                    </div>
                                    <div
                                        className="editor-v4-floating-menu-modern-dropdown__menu-item-text"
                                        ref={option === selectedOption ? setActiveItem : undefined}
                                    >
                                        <div className="editor-v4-floating-menu-modern-dropdown__menu-item-title">
                                            <Highlight search={highlight}>{option.text}</Highlight>
                                        </div>
                                        <div className="editor-v4-floating-menu-modern-dropdown__menu-item-description">
                                            {option.description || ' '}
                                        </div>
                                    </div>
                                    {(option.isBeta || option.isNew) && (
                                        <div
                                            className={classNames(
                                                'editor-v4-floating-menu-modern-dropdown__menu-item-label',
                                                option.isBeta
                                                    ? 'editor-v4-floating-menu-modern-dropdown__menu-item-label--beta'
                                                    : 'editor-v4-floating-menu-modern-dropdown__menu-item-label--new',
                                            )}
                                        >
                                            {option.isBeta ? 'testing' : 'new'}
                                        </div>
                                    )}
                                </MenuItem>
                            ))}
                        </Fragment>
                    ))}
                </ul>
            </FancyScrollbars>
        </div>
    );
}

function Highlight({ children: text, search }: { children: string; search?: string }) {
    if (!text || !search) {
        return <>{text}</>;
    }

    const nodes: ReactNode[] = [];
    let offset = 0;

    text.toLowerCase()
        .split(search.toLowerCase())
        .forEach((substring, index) => {
            if (index === 0) {
                nodes.push(text.substr(offset, substring.length));
                offset += substring.length;
            } else {
                nodes.push(<em key={offset}>{text.substr(offset, search.length)}</em>);
                nodes.push(text.substr(offset + search.length, substring.length));
                offset += search.length + substring.length;
            }
        });

    return <>{nodes}</>;
}
