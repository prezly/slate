import type { ContactNode } from '@prezly/slate-types';
import type { PressContact } from '@prezly/slate-types';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { Avatar, EditorBlock } from '#components';
import { User } from '#icons';

import styles from './PressContactElement.module.scss';

interface Props extends RenderElementProps {
    element: ContactNode;
}

export function PressContactElement({ attributes, children, element }: Props) {
    return (
        <EditorBlock
            {...attributes}
            element={element}
            renderBlock={() => (
                <div className={styles.wrapper}>
                    {element.contact.avatar_url && (
                        <Avatar
                            className={styles.avatar}
                            name={element.contact.name}
                            size="large"
                            square
                            src={element.contact.avatar_url}
                        />
                    )}

                    {!element.contact.avatar_url && (
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
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}

export function JobDescription(props: { className?: string; contact: PressContact }) {
    const { description, company } = props.contact;
    // If there is not text to show, render an empty <div> to keep height consistent.
    const text = [description, company].filter(Boolean).join(', ') || <>&nbsp;</>;

    return <div className={classNames(styles.jobDescription, props.className)}>{text}</div>;
}

function SocialFields(props: { contact: PressContact }) {
    const { email, phone, mobile, twitter, facebook, website } = props.contact;
    return (
        // TODO: Remove dependency on external CSS icons
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
            {/* TODO: Remove dependency on external CSS icons */}
            <i className={classNames(styles.socialIcon, 'icon', icon)} />
            {children}
        </li>
    );
}
