import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, SVGProps } from 'react';

import { Envelope, Facebook, Phone, Telephone, Twitter, Window } from '../../icons';
import { identity } from '../../lib';

import SocialField from './SocialField';
import './SocialFields.scss';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
}

interface Entry {
    href: string;
    Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
}

const getMailtoHref = (email: string | null): string => {
    return email ? `mailto:${email}` : '';
};

const getTelHref = (phone: string | null): string => {
    return phone ? `tel:${phone}` : '';
};

const getFacebookHref = (facebook: string | null): string => {
    return facebook ? `https://www.facebook.com/${facebook}` : '';
};

const getTwitterHref = (twitter: string | null): string => {
    return twitter ? `https://twitter.com/${twitter}` : '';
};

const SocialFields: FunctionComponent<Props> = ({ className, contact }) => {
    const socialFields = [
        { href: getMailtoHref(contact.email), Icon: Envelope, value: contact.email },
        { href: getTelHref(contact.phone), Icon: Telephone, value: contact.phone },
        { href: getTelHref(contact.mobile), Icon: Phone, value: contact.mobile },
        { href: getTwitterHref(contact.twitter), Icon: Twitter, value: contact.twitter },
        { href: getFacebookHref(contact.facebook), Icon: Facebook, value: contact.facebook },
        { href: identity(contact.website), Icon: Window, value: contact.website },
    ];

    const nonEmptySocialFields = socialFields.filter(({ value }) => Boolean(value)) as Entry[];

    if (nonEmptySocialFields.length === 0) {
        return null;
    }

    return (
        <ul className={classNames('prezly-slate-social-fields', className)}>
            {nonEmptySocialFields.map(({ href, Icon, value }) => (
                <SocialField
                    className="prezly-slate-social-fields__field"
                    href={href}
                    Icon={Icon}
                    value={value}
                />
            ))}
        </ul>
    );
};

export default SocialFields;
