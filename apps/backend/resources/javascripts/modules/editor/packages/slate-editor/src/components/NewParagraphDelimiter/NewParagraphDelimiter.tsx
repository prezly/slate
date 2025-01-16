import type { ElementNode } from '@prezly/slate-types';
import { findNodePath, useEditorRef } from '@udecode/plate-common/react';
import classNames from 'classnames';
import type { MouseEvent } from 'react';
import React from 'react';
import { Path } from 'slate';

import { useFunction } from '#lib';

import { EventsEditor } from '#modules/events';

import styles from './NewParagraphDelimiter.module.scss';

interface Props {
    element: ElementNode;
    position: 'top' | 'bottom';
    title?: string;
    extendedHitArea?: boolean;
}

export function NewParagraphDelimiter(props: Props) {
    const { element, position, title = 'Click to insert a new paragraph' } = props;

    const editor = useEditorRef();

    const handleClick = useFunction((event: MouseEvent) => {
        preventBubbling(event);

        const path = findNodePath(editor, element);
        if (!path) {
            return;
        }

        editor.insertNodes(editor.createDefaultTextBlock(), {
            at: position === 'top' ? path : Path.next(path),
            select: true,
        });

        EventsEditor.dispatchEvent(editor, 'empty-paragraph-inserted', {
            trigger: 'area-around-block',
        });
    });

    return (
        <div
            data-slate-void={true}
            data-new-paragraph-delimiter={true}
            data-new-paragraph-delimiter-position={position}
            className={classNames(styles.NewParagraphDelimiter, {
                [styles.top]: position === 'top',
                [styles.bottom]: position === 'bottom',
                [styles.extendedHitArea]: props.extendedHitArea,
            })}
            contentEditable={false}
            onClick={handleClick}
            role="button"
            title={title}
        >
            {title}
        </div>
    );
}

function preventBubbling(event: MouseEvent) {
    event.stopPropagation();
}
