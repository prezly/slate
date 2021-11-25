import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';

interface Props {
    children: ReactNode;
    icon: string;
}

const SocialField: FunctionComponent<Props> = ({ children, icon }) => (
    <li className="editor-v4-press-contact-element__social-field">
        <i className={classNames('editor-v4-press-contact-element__social-icon', 'icon', icon)} />

        {children}
    </li>
);

export default SocialField;
