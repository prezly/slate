import { noop } from '@technically/lodash';
import classNames from 'classnames';
import maxSize from 'popper-max-size-modifier';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { usePopper } from 'react-popper';

import { FancyScrollbars } from '#components';
import { BatsIllustration, WarningCircle } from '#icons';

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
    selectedOption: Option<Action> | undefined;
}

const STEPS = [528, 480, 432, 384, 336, 304];
const [MIN_HEIGHT] = [...STEPS].reverse();

/**
 * @see MT-5210
 */
function discreteHeight(height: number): number {
    for (const step of STEPS) {
        if (height > step) {
            return step;
        }
    }
    return MIN_HEIGHT;
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
            enabled: true,
            options: {
                fallbackPlacements: ['top-start'],
            },
        },
        maxSize,
        {
            name: 'maxSize',
            options: {
                padding: 16,
            },
        } as typeof maxSize,
        {
            name: 'tweakMaxSize',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['flip', 'maxSize'],
            fn({ state }) {
                // The `flip` modifier provides this data
                const { _skip: flip = false } = state.modifiersData.flip as { _skip: boolean };
                // The `maxSize` modifier provides this data
                const { height } = state.modifiersData.maxSize as { height: number };

                const maxHeight = flip ? MIN_HEIGHT : discreteHeight(height);

                state.styles.popper = {
                    ...state.styles.popper,
                    maxHeight: `${maxHeight}px`,
                };
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
    const [scrollarea, setScrollarea] = useState<FancyScrollbars | null>(null);
    const {
        attributes,
        styles: inlineStyles,
        forceUpdate,
    } = usePopper(referenceElement, scrollarea?.container, POPPER_CONFIG);

    useEffect(
        function () {
            if (activeItem) {
                scrollarea?.ensureVisible(activeItem, 32);
            }
        },
        [activeItem, scrollarea],
    );

    useLayoutEffect(() => {
        if (scrollarea) {
            forceUpdate?.();
        }
    }, [scrollarea, forceUpdate]);

    return (
        <div
            className={classNames(styles.Dropdown, {
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
                ref={setScrollarea}
                style={{ ...inlineStyles.popper, width: 'auto' }}
            >
                <ul
                    className={classNames('dropdown-menu', styles.Menu, className)}
                    onMouseDown={(event) => event.preventDefault()}
                >
                    {options.length === 0 && (
                        <MenuItem
                            disabled
                            className={classNames(styles.MenuItem, styles.noResults)}
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
                            <MenuItem group>{group}</MenuItem>
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
                                            <Highlight search={highlight}>
                                                {option.description}
                                            </Highlight>
                                        </div>
                                    </div>
                                    {(option.isBeta || option.isNew) && (
                                        <div
                                            className={classNames(
                                                styles.MenuItemLabel,
                                                option.isBeta ? styles.beta : styles.primary,
                                            )}
                                        >
                                            {option.isBeta ? 'labs' : 'new'}
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

function MenuItem({
    active,
    group,
    children,
    className,
    disabled,
    ...props
}: HTMLAttributes<HTMLLIElement> & { group?: boolean; active?: boolean; disabled?: boolean }) {
    return (
        <li
            className={classNames(className, {
                [styles.MenuGroup]: group,
                [styles.active]: active,
                [styles.disabled]: disabled,
            })}
            {...props}
        >
            <div>{children}</div>
        </li>
    );
}
