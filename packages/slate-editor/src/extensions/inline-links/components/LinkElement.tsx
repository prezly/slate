import type { LinkNode } from '@prezly/slate-types';
import { findNodePath, useEditorRef } from '@udecode/plate-common/react';
import React from 'react';
import { Range } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { LinkWithTooltip } from '#modules/components';

import type { InlineLinksExtensionConfiguration } from '../types';

import styles from './LinkElement.module.scss';

interface Props extends RenderElementProps {
    element: LinkNode;
    predefinedLinks: InlineLinksExtensionConfiguration['predefinedLinks'];
}

export function LinkElement({ attributes, children, element, predefinedLinks }: Props) {
    const editor = useEditorRef();
    const predefinedLink = predefinedLinks?.options.find(({ value }) => value === element.href);

    function onMouseUp() {
        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const path = findNodePath(editor, element);
            if (path) {
                const range = editor.range(path);
                editor.select(range);
            }
        }
    }

    return (
        // Using a wrapping `span` to avoid a rare Slate bug which occurs as
        // a failed `ReactEditor.toSlateNode` in Slate's Editable onClick handler.
        // For more details, see https://github.com/prezly/prezly/pull/8016#discussion_r454190469
        <span {...attributes}>
            <LinkWithTooltip
                href={predefinedLink?.label ?? element.href}
                textOnly={predefinedLink !== undefined}
            >
                {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                    <a
                        {...ariaAttributes}
                        className={styles.link}
                        href={element.href}
                        onBlur={onHide}
                        onFocus={onShow}
                        onMouseUp={onMouseUp}
                        onMouseEnter={onShow}
                        onMouseLeave={onHide}
                        ref={setReferenceElement}
                        rel="noreferrer"
                        target={element.new_tab ? '_blank' : undefined}
                    >
                        {children}
                    </a>
                )}
            </LinkWithTooltip>
        </span>
    );
}
