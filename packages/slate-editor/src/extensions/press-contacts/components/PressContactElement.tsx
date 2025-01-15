import type { ContactInfo, ContactNode } from '@prezly/slate-types';
import { ContactLayout } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import classNames from 'classnames';
import { useCallback } from 'react';
import React from 'react';
import type { FunctionComponent, ReactNode, SVGProps } from 'react';

import { Avatar, EditorBlock } from '#components';
import { Envelope, Globe, Mobile, Phone, SocialFacebook, SocialTwitter } from '#icons';

import { getSocialHandles, getUrl, removePressContact, updatePressContact } from '../lib';
import type { PressContactsExtensionParameters } from '../types';

import styles from './PressContactElement.module.scss';
import { PressContactMenu } from './PressContactMenu';

interface Props extends RenderElementProps {
    element: ContactNode;
    onEdit?: PressContactsExtensionParameters['onEdit'];
    renderMenu?: (props: { onClose: () => void }) => ReactNode;
}

export function PressContactElement({ attributes, children, element, onEdit, renderMenu }: Props) {
    const editor = useEditorRef();
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
    const handleRemove = useCallback(() => removePressContact(editor), [editor]);

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
                        element={element}
                        onEdit={onEdit}
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

                    <div className={styles.content}>
                        <h3 className={styles.name}>{element.contact.name}</h3>

                        <JobDescription contact={element.contact} />

                        <ContactFields
                            contact={element.contact}
                            isSignatureLayout={isSignatureLayout}
                        />
                        <SocialFields contact={element.contact} isCardLayout={isCardLayout} />
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

function SocialFields(props: { contact: ContactInfo; isCardLayout: boolean }) {
    const { contact, isCardLayout } = props;
    const { facebook, twitter } = getSocialHandles(contact);
    const website = getUrl(contact.website);

    return (
        <ul className={classNames(styles.fields, styles.social)}>
            {website && isCardLayout && <Field icon={Globe}>{website.hostname}</Field>}
            {facebook && <Field icon={SocialFacebook}>{isCardLayout && facebook}</Field>}
            {twitter && <Field icon={SocialTwitter}>{isCardLayout && `@${twitter}`}</Field>}
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
            {children && <span className={styles.content}>{children}</span>}
        </li>
    );
}
