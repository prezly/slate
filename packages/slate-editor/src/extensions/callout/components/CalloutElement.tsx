import type { Placement } from '@popperjs/core';
import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import EmojiPicker, { EmojiStyle, SuggestionMode } from 'emoji-picker-react';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef, useCallback, useState } from 'react';
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

        const togglePicker = useCallback(() => {
            setPickerOpen((open) => !open);
        }, []);

        const closePicker = useCallback(() => {
            setPickerOpen(false);
        }, []);

        const align = element.align ?? Alignment.LEFT;
        const isEmpty = EditorCommands.isNodeEmpty(editor, element);
        const isSelected = useSelected();

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
                    <IconButton
                        icon={element.icon ?? null}
                        onClick={togglePicker}
                        ref={setReferenceElement}
                    />
                    {isPickerOpen && (
                        <Picker
                            empty={!element.icon}
                            onClose={closePicker}
                            onPick={(icon) => {
                                updateCallout(editor, element, { icon: icon ?? '' });
                                closePicker();
                            }}
                            referenceElement={referenceElement}
                            placement={selectPlacement(align)}
                        />
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

const IconButton = forwardRef(
    (props: { icon: string | null; onClick: () => void }, ref: Ref<HTMLButtonElement>) => {
        return (
            <button
                className={classNames(styles.IconButton, {
                    [styles.empty]: !props.icon,
                })}
                contentEditable={false}
                ref={ref}
                title={
                    !props.icon
                        ? 'Add icon! If left empty, the icon will not appear in your story.'
                        : 'Change icon'
                }
                onClick={props.onClick}
            >
                {props.icon}
            </button>
        );
    },
);

IconButton.displayName = 'IconButton';

function Picker(props: {
    empty: boolean;
    referenceElement: HTMLElement | null;
    onPick: (icon: string | null) => void;
    onClose: () => void;
    placement: Placement;
}) {
    const [pickerElement, setPickerElement] = useState<HTMLElement | null>(null);

    useRootClose(pickerElement, props.onClose);

    return (
        <Popper
            referenceElement={props.referenceElement ?? undefined}
            placement={props.placement}
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
                        onEmojiClick={({ emoji }) => props.onPick(emoji)}
                        previewConfig={{ showPreview: false }}
                        skinTonesDisabled={true}
                        suggestedEmojisMode={SuggestionMode.RECENT}
                        emojiStyle={EmojiStyle.APPLE}
                    />
                    <label className={styles.NoIconOption}>
                        <input
                            type="checkbox"
                            style={{}}
                            onInput={() => props.onPick(null)}
                            disabled={props.empty}
                            checked={props.empty}
                        />
                        <span>Don&apos;t show icon</span>
                    </label>
                </div>
            )}
        </Popper>
    );
}

function selectPlacement(align: Alignment): Placement {
    if (align === 'left') {
        return 'right-start';
    }
    if (align === 'right') {
        return 'left-start';
    }
    return 'bottom';
}
