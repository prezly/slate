import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { PressContact } from 'types';

import './JobDescription.scss';

interface Props {
    className?: string;
    contact: PressContact;
}

const JobDescription: FunctionComponent<Props> = ({ className, contact }) => {
    const { description, company } = contact;
    // If there is not text to show, render an empty <div> to keep height consistent.
    const text = [description, company].filter(Boolean).join(', ') || <>&nbsp;</>;

    return (
        <div className={classNames('editor-v4-press-contact-job-description', className)}>
            {text}
        </div>
    );
};

export default JobDescription;
