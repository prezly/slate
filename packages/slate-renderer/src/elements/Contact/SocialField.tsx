import classNames from 'classnames';
import React, { FunctionComponent, SVGProps } from 'react';

import './SocialField.scss';

interface Props {
    className?: string;
    href: string;
    IconComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
    value: string;
}

const SocialFields: FunctionComponent<Props> = ({ className, href, IconComponent, value }) => (
    <li className={classNames('prezly-slate-social-field', className)} title={value}>
        <a
            className="prezly-slate-social-field__link"
            href={href}
            rel="noreferrer noopener"
            target="_blank"
        >
            <IconComponent className="prezly-slate-social-field__icon" />
            <span className="prezly-slate-social-field__value">{value}</span>
        </a>
    </li>
);

export default SocialFields;
