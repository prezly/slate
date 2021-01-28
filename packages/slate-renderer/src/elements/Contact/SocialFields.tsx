import { ContactNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, SVGProps } from 'react';

import { Envelope, Facebook, Phone, Telephone, Twitter, Window } from '../../icons';

import SocialField from './SocialField';
import './SocialFields.scss';

interface Props {
    className?: string;
    contact: ContactNode['contact'];
}

interface Entry {
    href: string;
    IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
}

const getMailtoHref = (email: string | null): string => (email ? `mailto:${email}` : '');

const getTelHref = (phone: string | null): string => (phone ? `tel:${phone}` : '');

const SocialFields: FunctionComponent<Props> = ({ className, contact }) => {
    const socialFields = [
        { href: getMailtoHref(contact.email), IconComponent: Envelope, value: contact.email },
        { href: getTelHref(contact.phone), IconComponent: Telephone, value: contact.phone },
        { href: getTelHref(contact.mobile), IconComponent: Phone, value: contact.mobile },
        { href: contact.twitter, IconComponent: Twitter, value: contact.twitter },
        { href: contact.facebook, IconComponent: Facebook, value: contact.facebook },
        { href: contact.website, IconComponent: Window, value: contact.website },
    ];

    const nonEmptySocialFields = socialFields.filter(({ value }) => Boolean(value)) as Entry[];

    if (nonEmptySocialFields.length === 0) {
        return null;
    }

    return (
        <ul className={classNames('prezly-slate-social-fields', className)}>
            {nonEmptySocialFields.map(({ href, IconComponent, value }) => (
                <SocialField
                    className="prezly-slate-social-fields__field"
                    href={href}
                    IconComponent={IconComponent}
                    value={value}
                />
            ))}
        </ul>
    );
};

export default SocialFields;
