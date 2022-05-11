import type { ContactNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { Avatar, EditorBlock } from '#components';
import { User } from '#icons';

import { JobDescription } from './JobDescription';
import styles from './PressContactElement.module.scss';
import { SocialFields } from './SocialFields';

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

                        <JobDescription
                            className={styles.jobDescription}
                            contact={element.contact}
                        />

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
