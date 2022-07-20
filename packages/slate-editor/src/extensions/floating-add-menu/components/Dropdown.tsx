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

import styles from './Dropdown.module.scss';

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

export function Dropdown<Action>({
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

    const [activeItem, setActiveItem] = useState<HTMLElement | null>(null);
    const scrollarea = useRef<FancyScrollbars | null>(null);
    const { attributes, styles: inlineStyles } = usePopper(
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
            className={classNames(styles.Dropdown, styles.Dropdown, {
                [styles.noResults]: options.length === 0,
                open,
            })}
        >
            <FancyScrollbars
                {...attributes.popper}
                autoHeight
                autoHeightMin={20}
                autoHeightMax={1000}
                className={styles.ScrollArea}
                ref={scrollarea}
                style={{ ...inlineStyles.popper, width: 'auto' }}
            >
                <ul
                    className={classNames('dropdown-menu', styles.Menu, className)}
                    onMouseDown={(event) => event.preventDefault()}
                >
                    {options.length === 0 && (
                        <MenuItem
                            className={classNames(styles.MenuItem, styles.noResults)}
                            disabled
                            onClick={noop}
                        >
                            <div className={styles.MenuItemIcon}>
                                <WarningCircle />
                            </div>
                            <div className={styles.MenuItemText}>No results</div>
                            <BatsIllustration className={styles.MenuItemDecoration} />
                        </MenuItem>
                    )}

                    {groups.map(({ group, options }) => (
                        <Fragment key={`group:${group}`}>
                            <MenuItem className={styles.MenuGroup} header>
                                {group}
                            </MenuItem>
                            {options.map((option) => (
                                <MenuItem
                                    active={option === selectedOption}
                                    className={styles.MenuItem}
                                    key={`option:${option.text}`}
                                    onClick={(event) => event.preventDefault()}
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        onItemClick(option);
                                    }}
                                >
                                    <div
                                        className={styles.MenuItemIcon}
                                        data-action={option.action}
                                    >
                                        {isComponent(option.icon) ? <option.icon /> : option.icon}
                                    </div>
                                    <div
                                        className={styles.MenuItemText}
                                        ref={option === selectedOption ? setActiveItem : undefined}
                                    >
                                        <div className={styles.MenuItemTitle}>
                                            <Highlight search={highlight}>{option.text}</Highlight>
                                        </div>
                                        <div className={styles.MenuItemDescription}>
                                            {option.description}
                                        </div>
                                    </div>
                                    {(option.isBeta || option.isNew) && (
                                        <div
                                            className={classNames(
                                                styles.MenuItemLabel,
                                                option.isBeta ? styles.beta : styles.new,
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
