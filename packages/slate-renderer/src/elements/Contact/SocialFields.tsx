import { ContactNode } from '@prezly/slate-types';
import React, { FunctionComponent } from 'react';

import { envelope, facebook, phone, telephone, twitter, window } from '../../icons';

interface Props {
    contact: ContactNode['contact'];
}

const SocialFields: FunctionComponent<Props> = ({ contact }) => (
    <ul className="prezly-slate-contact__social-fields">
        {contact.email && (
            <li className="prezly-slate-contact__social-field" title={contact.email}>
                <img className="prezly-slate-contact__social-field-icon" src={envelope} />
                <span className="prezly-slate-contact__social-field-value">{contact.email}</span>
            </li>
        )}

        {contact.phone && (
            <li className="prezly-slate-contact__social-field" title={contact.phone}>
                <img className="prezly-slate-contact__social-field-icon" src={telephone} />
                <span className="prezly-slate-contact__social-field-value">{contact.phone}</span>
            </li>
        )}

        {contact.mobile && (
            <li className="prezly-slate-contact__social-field" title={contact.mobile}>
                <img className="prezly-slate-contact__social-field-icon" src={phone} />
                <span className="prezly-slate-contact__social-field-value">{contact.mobile}</span>
            </li>
        )}

        {contact.twitter && (
            <li className="prezly-slate-contact__social-field" title={contact.twitter}>
                <img className="prezly-slate-contact__social-field-icon" src={twitter} />
                <span className="prezly-slate-contact__social-field-value">{contact.twitter}</span>
            </li>
        )}

        {contact.facebook && (
            <li className="prezly-slate-contact__social-field" title={contact.facebook}>
                <img className="prezly-slate-contact__social-field-icon" src={facebook} />
                <span className="prezly-slate-contact__social-field-value">{contact.facebook}</span>
            </li>
        )}

        {contact.website && (
            <li className="prezly-slate-contact__social-field" title={contact.website}>
                <img className="prezly-slate-contact__social-field-icon" src={window} />
                <span className="prezly-slate-contact__social-field-value">{contact.website}</span>
            </li>
        )}
    </ul>
);

export default SocialFields;
