import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Envelope, Facebook, Phone, Telephone, Twitter, Window } from '../../icons';
import { identity } from '../../lib';

import { getMailtoHref, getTelHref, getFacebookHref, getTwitterHref } from './lib';
import SocialField from './SocialField';
import './SocialFields.scss';
import { SocialFieldEntry } from './types';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
}

const SocialFields: FunctionComponent<Props> = ({ className, contact }) => {
    const socialFields = Object.entries({
        email: { getHref: getMailtoHref, Icon: Envelope, value: contact.email },
        phone: { getHref: getTelHref, Icon: Telephone, value: contact.phone },
        mobile: { getHref: getTelHref, Icon: Phone, value: contact.mobile },
        twitter: { getHref: getTwitterHref, Icon: Twitter, value: contact.twitter },
        facebook: { getHref: getFacebookHref, Icon: Facebook, value: contact.facebook },
        website: { getHref: identity, Icon: Window, value: contact.website },
    });

    const nonEmptySocialFields = socialFields.filter(([_key, { value }]) => {
        return Boolean(value);
    }) as SocialFieldEntry[];

    if (nonEmptySocialFields.length === 0) {
        return null;
    }

    return (
        <ul className={classNames('prezly-slate-social-fields', className)}>
            {nonEmptySocialFields.map(([key, { getHref, Icon, value }]) => (
                <SocialField
                    className="prezly-slate-social-fields__field"
                    key={key}
                    href={getHref(value)}
                    Icon={Icon}
                    value={value}
                />
            ))}
        </ul>
    );
};

export default SocialFields;
