import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import Avatar from './Avatar';
import './Contact.scss';
import SocialFields from './SocialFields';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    node: ContactNode;
}

const Contact: FunctionComponent<Props> = ({ children, className, node, ...props }) => {
    const { contact } = node;
    const jobDescription = [contact.description, contact.company].filter(Boolean).join(', ');

    return (
        <div className={classNames('prezly-slate-contact', className)} {...props}>
            <div className="prezly-slate-contact__wrapper">
                <Avatar name={contact.name} src={contact.avatar_url} />

                <div className="prezly-slate-contact__content">
                    <h3 className="prezly-slate-contact__name">{contact.name}</h3>
                    <div className="prezly-slate-contact__job-description">
                        {/* If there is no text to show, render an empty <div> to keep height consistent */}
                        {jobDescription || <>&nbsp;</>}
                    </div>
                    <SocialFields contact={contact} />
                </div>
            </div>
        </div>
    );
};

export default Contact;
