import type { ContactInfo, ContactNode } from '@prezly/slate-types';
import { ContactLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { Avatar, EditorBlock } from '#components';
import { User } from '#icons';

import { removePressContact, updatePressContact } from '../lib';

import styles from './PressContactElement.module.scss';
import { PressContactMenu } from './PressContactMenu';

interface Props extends RenderElementProps {
    element: ContactNode;
    renderMenu?: (props: { onClose: () => void }) => ReactNode;
}

export function PressContactElement({ attributes, children, element, renderMenu }: Props) {
    const editor = useSlateStatic();
    const { layout, show_avatar: showAvatar } = element;
    const isCardLayout = layout === ContactLayout.CARD;

    const handleToggleAvatar = useCallback(
        (showAvatar: boolean) => updatePressContact(editor, element, { show_avatar: showAvatar }),
        [editor, element],
    );
    const handleChangeLayout = useCallback(
        (layout: ContactLayout) => updatePressContact(editor, element, { layout }),
        [editor, element],
    );
    const handleRemove = useCallback(() => removePressContact(editor), [editor, element]);

    return (
        <EditorBlock
            {...attributes}
            border={isCardLayout}
            element={element}
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderMenu={(props) => {
                if (renderMenu) {
                    return renderMenu(props);
                }

                return (
                    <PressContactMenu
                        layout={layout}
                        showAvatar={showAvatar}
                        onClose={props.onClose}
                        onChangeLayout={handleChangeLayout}
                        onToggleAvatar={handleToggleAvatar}
                        onRemove={handleRemove}
                    />
                );
            }}
            renderReadOnlyFrame={() => (
                <div
                    className={classNames(styles.wrapper, {
                        [styles.card]: isCardLayout,
                        [styles.withAvatar]: showAvatar,
                    })}
                >
                    {element.contact.avatar_url && showAvatar && (
                        <Avatar
                            className={styles.avatar}
                            name={element.contact.name}
                            size="large"
                            square
                            src={element.contact.avatar_url}
                        />
                    )}

                    {!element.contact.avatar_url && showAvatar && (
                        <div className={styles.avatar}>
                            <User className={styles.avatarPlaceholder} />
                        </div>
                    )}

                    <div className={styles.content}>
                        <h3 className={styles.name}>{element.contact.name}</h3>

                        <JobDescription contact={element.contact} />

                        <SocialFields contact={element.contact} />
                    </div>
                </div>
            )}
            rounded
            void
        />
    );
}

export function JobDescription(props: { className?: string; contact: ContactInfo }) {
    const { description, company } = props.contact;
    // If there is not text to show, render an empty <div> to keep height consistent.
    const text = [description, company].filter(Boolean).join(', ').trim();

    if (!text) {
        return null;
    }

    return <div className={classNames(styles.jobDescription, props.className)}>{text}</div>;
}

function SocialFields(props: { contact: ContactInfo }) {
    const { email, phone, mobile, twitter, facebook, website } = props.contact;
    return (
        // TODO: Remove dependency on external CSS icons (DEV-479)
        <ul className={styles.socialFields}>
            {email && <SocialField icon="icon-paper-plane">{email}</SocialField>}
            {phone && <SocialField icon="icon-phone">{phone}</SocialField>}
            {mobile && <SocialField icon="icon-mobile">{mobile}</SocialField>}
            {twitter && <SocialField icon="icon-twitter">{twitter}</SocialField>}
            {facebook && <SocialField icon="icon-facebook2">{facebook}</SocialField>}
            {website && <SocialField icon="icon-browser">{website}</SocialField>}
        </ul>
    );
}

export function SocialField({ children, icon }: { children: ReactNode; icon: string }) {
    return (
        <li className={styles.socialField}>
            {/* TODO: Remove dependency on external CSS icons (DEV-479) */}
            <i className={classNames(styles.socialIcon, 'icon', icon)} />
            {children}
        </li>
    );
}
