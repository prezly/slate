import classNames from 'classnames';
import type { MouseEvent } from 'react';
import React, { useState } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import type { Element } from 'slate';
import { Path, Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import { ThreeDotsMenu as Icon } from '#icons';
import { useFunction, useUniqueId } from '#lib';

import { EventsEditor } from '#modules/events';

import styles from './ThreeDotsMenu.module.scss';

interface Props {
    className?: string;
    element: Element;
    show: boolean;
}

export function ThreeDotsMenu({ className, element, show }: Props) {
    const editor = useSlateStatic();
    const [open, setOpen] = useState(false);
    const id = useUniqueId('editor-block-three-dots-menu-');

    function handleClick(position: 'above' | 'below', event: MouseEvent) {
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
        <div className={classNames(styles.ThreeDotsMenu, className, {
            [styles.show]: show,
            [styles.open]: open,
        })}>
            <DropdownButton
                className={styles.Button}
                contentEditable={false}
                data-editor-block-menu={true}
                id={id}
                onClick={() => setOpen(!open)}
                open={open}
                title={<Icon className={styles.Icon} />}
            >
                <MenuItem onClick={useFunction((event) => handleClick('above', event))}>
                    Insert line above
                </MenuItem>
                <MenuItem onClick={useFunction((event) => handleClick('below', event))}>
                    Insert line below
                </MenuItem>
            </DropdownButton>
        </div>
    );
}
