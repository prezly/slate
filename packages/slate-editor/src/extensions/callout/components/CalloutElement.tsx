import type { Placement } from '@popperjs/core';
import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import { Alignment } from '@prezly/slate-types';
import classNames from 'classnames';
import EmojiPicker, { EmojiStyle, SuggestionMode } from 'emoji-picker-react';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef, useCallback, useState } from 'react';
import { useRootClose } from 'react-overlays';
import { type Modifier, Popper } from 'react-popper';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic } from 'slate-react';

import { NewParagraphDelimiter, TooltipV2 } from '#components';
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
        const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);

        const togglePicker = useCallback(() => {
            Transforms.collapse(editor);
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
                    <TooltipV2.Tooltip
                        enabled={!isPickerOpen}
                        tooltip={<Tooltip empty={!element.icon} />}
                        placement="bottom"
                    >
                        {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                            <IconButton
                                {...ariaAttributes}
                                onMouseEnter={onShow}
                                onMouseLeave={onHide}
                                icon={element.icon ?? null}
                                onClick={togglePicker}
                                ref={mergeRefs<HTMLButtonElement>(
                                    setReferenceElement,
                                    setButtonElement,
                                )}
                            />
                        )}
                    </TooltipV2.Tooltip>

                    {isPickerOpen && (
                        <Picker
                            empty={!element.icon}
                            onClose={closePicker}
                            onPick={(icon) => {
                                updateCallout(editor, element, { icon: icon ?? '' });
                                closePicker();
                            }}
                            referenceElement={buttonElement}
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
    (
        props: { icon: string | null } & HTMLAttributes<HTMLButtonElement>,
        ref: Ref<HTMLButtonElement>,
    ) => {
        const { icon, className, ...attributes } = props;
        const empty = !icon;
        return (
            <button
                className={classNames(styles.IconButton, className, {
                    [styles.empty]: empty,
                })}
                contentEditable={false}
                ref={ref}
                {...attributes}
            >
                {icon}
            </button>
        );
    },
);

IconButton.displayName = 'IconButton';

const OFFSET_MODIFIER: Modifier<'offset'> = {
    name: 'offset',
    options: {
        offset: [8, 8],
    },
};

const MODIFIERS = [OFFSET_MODIFIER];

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
            modifiers={MODIFIERS}
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
                        width={275}
                        height={350}
                    />
                    <label className={styles.NoIconOption}>
                        <input
                            type="checkbox"
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

function Tooltip(props: { empty: boolean }) {
    if (props.empty) {
        return (
            <div>
                <strong>Add icon!</strong>
                <br />
                <span style={{ fontWeight: 'normal' }}>
                    If left empty, the icon
                    <br /> will not appear in your
                    <br />
                    story.
                </span>
            </div>
        );
    }

    return 'Change icon';
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
