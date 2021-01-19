import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { personFill } from '../../icons';

import './Contact.scss';
import SocialFields from './SocialFields';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    contact: ContactNode['contact'];
}

const Contact: FunctionComponent<Props> = ({ className, contact, ...props }) => (
    <div className={classNames('prezly-slate-contact', className)} {...props}>
        <div className="prezly-slate-contact__wrapper">
            {contact.avatar_url &&
                {
                    /*<Avatar
                                    className="prezly-slate-contact__avatar"
                                    name={contact.name}
                                    size="large"
                                    square
                                    src={contact.avatar_url}
                                />*/
                }}

            {!contact.avatar_url && (
                <div className="prezly-slate-contact__avatar">
                    <img className="prezly-slate-contact__placeholder" src={personFill} />
                </div>
            )}

            <div className="prezly-slate-contact__content">
                <h3 className="prezly-slate-contact__name">{contact.name}</h3>
                {/*
                <JobDescription
                    className="prezly-slate-contact__job-description"
                    contact={contact}
                />
*/}
                <SocialFields contact={contact} />
            </div>
        </div>
    </div>
);

export default Contact;
