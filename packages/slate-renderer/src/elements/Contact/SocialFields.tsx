import { ContactNode } from '@prezly/slate-types';
import React, { FunctionComponent } from 'react';

import { Envelope, Facebook, Phone, Telephone, Twitter, Window } from '../../icons';

interface Props {
    contact: ContactNode['contact'];
}

const SocialFields: FunctionComponent<Props> = ({ contact }) => (
    <ul className="prezly-slate-contact__social-fields">
        {contact.email && (
            <li className="prezly-slate-contact__social-field" title={contact.email}>
                <Envelope className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.email}</span>
            </li>
        )}

        {contact.phone && (
            <li className="prezly-slate-contact__social-field" title={contact.phone}>
                <Telephone className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.phone}</span>
            </li>
        )}

        {contact.mobile && (
            <li className="prezly-slate-contact__social-field" title={contact.mobile}>
                <Phone className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.mobile}</span>
            </li>
        )}

        {contact.twitter && (
            <li className="prezly-slate-contact__social-field" title={contact.twitter}>
                <Twitter className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.twitter}</span>
            </li>
        )}

        {contact.facebook && (
            <li className="prezly-slate-contact__social-field" title={contact.facebook}>
                <Facebook className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.facebook}</span>
            </li>
        )}

        {contact.website && (
            <li className="prezly-slate-contact__social-field" title={contact.website}>
                <Window className="prezly-slate-contact__social-field-icon" />
                <span className="prezly-slate-contact__social-field-value">{contact.website}</span>
            </li>
        )}
    </ul>
);

export default SocialFields;
