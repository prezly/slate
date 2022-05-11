import type { ContactNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { Avatar, EditorBlock } from '#components';
import { User } from '#icons';

import { JobDescription } from '../JobDescription';

import './PressContactElement.scss';
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
                <div className="editor-v4-press-contact-element__wrapper" contentEditable={false}>
                    {element.contact.avatar_url && (
                        <Avatar
                            className="editor-v4-press-contact-element__avatar"
                            name={element.contact.name}
                            size="large"
                            square
                            src={element.contact.avatar_url}
                        />
                    )}

                    {!element.contact.avatar_url && (
                        <div className="editor-v4-press-contact-element__avatar">
                            <User className="editor-v4-press-contact-element__placeholder" />
                        </div>
                    )}

                    <div className="editor-v4-press-contact-element__content">
                        <h3 className="editor-v4-press-contact-element__name">
                            {element.contact.name}
                        </h3>

                        <JobDescription
                            className="editor-v4-press-contact-element__job-description"
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
