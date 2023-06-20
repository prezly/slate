import { EditorCommands } from '@prezly/slate-commons';
import classNames from 'classnames';
import RangeFix from 'rangefix';
import type { FunctionComponent, ReactNode } from 'react';
import React, { useEffect, useMemo, useRef } from 'react';
import { MenuItem } from 'react-bootstrap';
import { usePopper } from 'react-popper';
import type { Range } from 'slate';
import { useSlate } from 'slate-react';

import { convertClientRect, ensureChildInView } from '#lib';

import type { Option } from '../types';

import styles from './MentionsDropdown.module.scss';

interface Props<V> {
    index: number;
    onOptionClick: (option: Option<V>) => void;
    options: Option<V>[];
    renderOption: (option: Option<V>) => ReactNode;
    target: Range | null;
}

const AUTO_SCROLL_SAFETY_MARGIN = 4;
const EMPTY_RECT = {
    x: 0,
    y: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    toJSON() {
        const { toJSON, ...rect } = this;
        return JSON.stringify(rect);
    },
};

export const MentionsDropdown = <V extends object>({
    index,
    onOptionClick,
    options,
    renderOption,
    target,
}: Props<V>): ReturnType<FunctionComponent<V>> => {
    const editor = useSlate();
    const suggestionsPanelRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        ensureChildInView(suggestionsPanelRef.current, index, AUTO_SCROLL_SAFETY_MARGIN);
    }, [index, suggestionsPanelRef]);

    const referenceElement = useMemo(() => {
        return {
            getBoundingClientRect(): ClientRect {
                if (!target) {
                    return EMPTY_RECT;
                }
                const domRange = EditorCommands.toDomRange(editor, target);
                if (!domRange) {
                    return EMPTY_RECT;
                }
                const rect = RangeFix.getBoundingClientRect(domRange);
                if (!rect) {
                    return EMPTY_RECT;
                }
                return convertClientRect(rect);
            },
        };
    }, [target]);

    const popper = usePopper(referenceElement, suggestionsPanelRef.current, {
        placement: 'bottom-start',
    });

    return (
        <ul
            {...popper.attributes.popper}
            className={classNames(styles.MentionsDropdown, 'dropdown-menu')}
            onMouseDown={(event) => event.preventDefault()}
            ref={suggestionsPanelRef}
            role="menu"
            style={popper.styles.popper}
        >
            {options.map((option, optionIndex) => (
                <MenuItem
                    active={index === optionIndex}
                    className={styles.Item}
                    key={option.id}
                    onClick={() => onOptionClick(option)}
                >
                    {renderOption(option)}
                </MenuItem>
            ))}
        </ul>
    );
};
