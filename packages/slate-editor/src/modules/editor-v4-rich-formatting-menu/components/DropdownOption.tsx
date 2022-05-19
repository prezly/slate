import classNames from 'classnames';
import React from 'react';

import type { Dropdown } from '#components/Menu';

import type { Formatting } from '../types';

import styles from './DropdownOption.module.scss';

type Option = Dropdown.Option<Formatting>;

interface Props {
    option: Option;
}

export function DropdownOption({ option }: Props) {
    return (
        <div
            className={classNames(styles.DropdownOption, {
                [styles.paragraph]: option.value === 'paragraph',
                [styles.heading1]: option.value === 'heading-one',
                [styles.heading2]: option.value === 'heading-two',
                [styles.blockquote]: option.value === 'block-quote',
                [styles.orderedList]: option.value === 'numbered-list',
                [styles.unorderedList]: option.value === 'bulleted-list',
            })}
        >
            {option.label}
        </div>
    );
}
