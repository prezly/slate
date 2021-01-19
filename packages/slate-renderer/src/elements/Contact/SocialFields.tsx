import { ContactNode } from '@prezly/slate-types';
import React, { FunctionComponent } from 'react';

import { envelope, facebook, globe, phoneFill, telephoneFill, twitter } from '../../icons';

interface Props {
    contact: ContactNode['contact'];
}

const SocialFields: FunctionComponent<Props> = ({ contact }) => (
    <ul className="prezly-slate-contact__social-fields">
        {contact.email && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={envelope} />
                {contact.email}
            </li>
        )}

        {contact.phone && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={telephoneFill} />
                {contact.phone}
            </li>
        )}

        {contact.mobile && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={phoneFill} />
                {contact.mobile}
            </li>
        )}

        {contact.twitter && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={twitter} />
                {contact.twitter}
            </li>
        )}

        {contact.facebook && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={facebook} />
                {contact.facebook}
            </li>
        )}

        {contact.website && (
            <li className="prezly-slate-contact__social-field">
                <img className="prezly-slate-contact__social-field-icon" src={globe} />
                {contact.website}
            </li>
        )}
    </ul>
);

export default SocialFields;
