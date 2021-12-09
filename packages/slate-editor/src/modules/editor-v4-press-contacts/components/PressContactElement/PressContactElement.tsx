import type { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { Avatar } from '../../../../components';
import { User } from '../../../../icons';
import JobDescription from '../JobDescription';

import './PressContactElement.scss';
import SocialFields from './SocialFields';

interface Props extends RenderElementProps {
    element: ContactNode;
}

const PressContactElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-press-contact-element', {
                'editor-v4-press-contact-element--active': isSelected,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
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

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};

export default PressContactElement;
