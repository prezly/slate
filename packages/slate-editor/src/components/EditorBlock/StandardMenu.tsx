import classNames from 'classnames';
import type { MouseEvent } from 'react';
import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import type { Element } from 'slate';
import { Path, Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { ThreeDotsMenu as Icon } from '#icons';
import { useFunction, useUniqueId } from '#lib';

import { EventsEditor } from '#modules/events';

import styles from './StandardMenu.module.scss';

interface Props {
    className?: string;
    element: Element;
    onClick: () => void;
    onDismiss: () => void;
    open: boolean;
}

export function StandardMenu({ className, element, onClick, open }: Props) {
    const editor = useSlateStatic();
    const id = useUniqueId('editor-block-standard-menu-');

    function handleClick(event: MouseEvent, position: 'above' | 'below') {
        event.stopPropagation();
        const path = ReactEditor.findPath(editor, element);
        Transforms.insertNodes(editor, editor.createDefaultTextBlock(), {
            at: position === 'above' ? path : Path.next(path),
            select: true,
        });

        EventsEditor.dispatchEvent(editor, 'empty-paragraph-inserted', {
            trigger: 'block-three-dots-menu',
        });
    }

    return (
        <div className={classNames(styles.StandardMenu, className)}>
            <DropdownButton
                className={styles.Button}
                contentEditable={false}
                data-editor-block-standard-menu={true}
                id={id}
                onClick={onClick}
                open={open}
                title={<Icon className={styles.Icon} />}
            >
                <MenuItem onClick={useFunction((event) => handleClick(event, 'above'))}>
                    Insert line above
                </MenuItem>
                <MenuItem onClick={useFunction((event) => handleClick(event, 'below'))}>
                    Insert line below
                </MenuItem>
            </DropdownButton>
        </div>
    );
}
