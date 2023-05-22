import type { ContactInfo, ContactNode } from '@prezly/slate-types';
import { ContactLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import { useCallback } from 'react';
import React from 'react';
import type { FunctionComponent, ReactNode, SVGProps } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSlateStatic } from 'slate-react';

import { Avatar, EditorBlock } from '#components';
import { Envelope, Globe, Mobile, Phone, SocialFacebook, SocialTwitter, User } from '#icons';

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
    const isSignatureLayout = layout === ContactLayout.SIGNATURE;

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
                        [styles.signature]: isSignatureLayout,
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

                        <ContactFields
                            contact={element.contact}
                            isSignatureLayout={isSignatureLayout}
                        />
                        <SocialFields contact={element.contact} showWebsite={isCardLayout} />
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

function ContactFields(props: { contact: ContactInfo; isSignatureLayout: boolean }) {
    const { isSignatureLayout } = props;
    const { email, phone, mobile, website } = props.contact;

    return (
        <ul className={styles.fields}>
            {isSignatureLayout ? (
                <>
                    {email && <Field>E. {email}</Field>}
                    {phone && <Field>P. {phone}</Field>}
                    {mobile && <Field>M. {mobile}</Field>}
                    {website && <Field>W. {website}</Field>}
                </>
            ) : (
                <>
                    {email && <Field icon={Envelope}>{email}</Field>}
                    {phone && <Field icon={Phone}>{phone}</Field>}
                    {mobile && <Field icon={Mobile}>{mobile}</Field>}
                </>
            )}
        </ul>
    );
}

function SocialFields(props: { contact: ContactInfo; showWebsite: boolean }) {
    const { showWebsite } = props;
    const { twitter, facebook, website } = props.contact;

    return (
        <ul className={classNames(styles.fields, styles.social)}>
            {website && showWebsite && <Field icon={Globe} />}
            {facebook && <Field icon={SocialFacebook} />}
            {twitter && <Field icon={SocialTwitter} />}
        </ul>
    );
}

export function Field({
    children,
    icon: Icon,
}: {
    children?: ReactNode;
    icon?: FunctionComponent<SVGProps<SVGSVGElement>> | string;
}) {
    return (
        <li className={styles.field}>
            {Icon && <Icon className={styles.icon} />}
            {children}
        </li>
    );
}
