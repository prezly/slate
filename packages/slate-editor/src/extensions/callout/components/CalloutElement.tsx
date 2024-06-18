import type { Placement } from '@popperjs/core';
import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import EmojiPicker, { SuggestionMode } from 'emoji-picker-react';
import type { HTMLAttributes, Ref } from 'react';
import { useState } from 'react';
import React, { forwardRef } from 'react';
import { useRootClose } from 'react-overlays';
import { Popper } from 'react-popper';
import { useSelected, useSlateStatic } from 'slate-react';

import { NewParagraphDelimiter } from '#components';
import { mergeRefs } from '#lib';

import { updateCallout } from '../lib';

import styles from './CalloutElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    element: CalloutNode;
}

export const CalloutElement = forwardRef(
    ({ children, className, element, ...props }: Props, ref: Ref<HTMLDivElement>) => {
        const editor = useSlateStatic();
        const [isPickerOpen, setPickerOpen] = useState(false);
        const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
        const [pickerElement, setPickerElement] = useState<HTMLElement | null>(null);

        function togglePicker() {
            setPickerOpen((prev) => !prev);
        }

        const align = element.align ?? Alignment.LEFT;
        const isEmpty = EditorCommands.isNodeEmpty(editor, element);
        const isSelected = useSelected();

        useRootClose(pickerElement, () => setPickerOpen(false));

        return (
            <div {...props} ref={ref} className={classNames(className, styles.CalloutElement)}>
                <NewParagraphDelimiter extendedHitArea element={element} position="top" />
                <div
                    className={classNames(className, styles.Callout, {
                        [styles.selected]: isSelected,
                        [styles.alignLeft]: align === Alignment.LEFT,
                        [styles.alignCenter]: align === Alignment.CENTER,
                        [styles.alignRight]: align === Alignment.RIGHT,
                    })}
                >
                    <button
                        className={classNames(styles.Icon, {
                            [styles.empty]: !element.icon,
                        })}
                        contentEditable={false}
                        ref={setReferenceElement}
                        title="Change icon"
                        onClick={() => togglePicker()}
                    >
                        {element.icon}
                    </button>
                    {isPickerOpen && (
                        <Popper
                            referenceElement={referenceElement ?? undefined}
                            placement={selectPlacement(align)}
                            strategy="absolute"
                        >
                            {({ ref, style }) => (
                                <div
                                    className={styles.Picker}
                                    ref={mergeRefs(setPickerElement, ref)}
                                    style={style}
                                    contentEditable={false}
                                >
                                    <EmojiPicker
                                        onEmojiClick={({ emoji }) => {
                                            updateCallout(editor, element, { icon: emoji });
                                            setPickerOpen(false);
                                        }}
                                        previewConfig={{ showPreview: false }}
                                        suggestedEmojisMode={SuggestionMode.RECENT}
                                    />
                                </div>
                            )}
                        </Popper>
                    )}

                    <p
                        data-placeholder="Write something here..."
                        className={classNames(styles.Content, className, {
                            [styles.empty]: isEmpty,
                            [styles.alignLeft]: align === Alignment.LEFT,
                            [styles.alignCenter]: align === Alignment.CENTER,
                            [styles.alignRight]: align === Alignment.RIGHT,
                        })}
                    >
                        {children}
                    </p>
                </div>
                <NewParagraphDelimiter extendedHitArea element={element} position="bottom" />
            </div>
        );
    },
);

CalloutElement.displayName = 'CalloutElement';

function selectPlacement(align: Alignment): Placement {
    if (align === 'left') {
        return 'right-start';
    }
    if (align === 'right') {
        return 'left-start';
    }
    return 'bottom';
}
