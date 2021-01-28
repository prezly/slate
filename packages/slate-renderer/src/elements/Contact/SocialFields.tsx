import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Envelope, Facebook, Phone, Telephone, Twitter, Window } from '../../icons';

import './SocialFields.scss';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
}

const SocialFields: FunctionComponent<Props> = ({ className, contact }) => (
    <ul className={classNames('prezly-slate-social-fields', className)}>
        {contact.email && (
            <li className="prezly-slate-social-fields__field" title={contact.email}>
                <Envelope className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.email}</span>
            </li>
        )}

        {contact.phone && (
            <li className="prezly-slate-social-fields__field" title={contact.phone}>
                <Telephone className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.phone}</span>
            </li>
        )}

        {contact.mobile && (
            <li className="prezly-slate-social-fields__field" title={contact.mobile}>
                <Phone className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.mobile}</span>
            </li>
        )}

        {contact.twitter && (
            <li className="prezly-slate-social-fields__field" title={contact.twitter}>
                <Twitter className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.twitter}</span>
            </li>
        )}

        {contact.facebook && (
            <li className="prezly-slate-social-fields__field" title={contact.facebook}>
                <Facebook className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.facebook}</span>
            </li>
        )}

        {contact.website && (
            <li className="prezly-slate-social-fields__field" title={contact.website}>
                <Window className="prezly-slate-social-fields__icon" />
                <span className="prezly-slate-social-fields__value">{contact.website}</span>
            </li>
        )}
    </ul>
);

export default SocialFields;
