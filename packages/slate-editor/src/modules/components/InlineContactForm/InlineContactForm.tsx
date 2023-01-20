import type { ContactInfo } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FormEvent } from 'react';
import { useRef } from 'react';
import React from 'react';
import { useEffect, useState } from 'react';

import { Avatar, Button, Input } from '../../../components';

import styles from './InlineContactForm.module.scss';

interface Props {
    contact: ContactInfo | null;
    isEditing?: true;
    onClose: () => void;
    onSubmit: (contact: ContactInfo) => void;
}

const TEXT_MAX_LENGTH = 150;

export function InlineContactForm({ contact, isEditing, onClose, onSubmit }: Props) {
    const [formState, setFormState] = useState<ContactInfo>({
        avatar_url: null,
        address: '',
        company: '',
        description: '',
        email: '',
        facebook: '',
        mobile: '',
        name: '',
        phone: '',
        twitter: '',
        website: '',
    });

    function handleChange(property: keyof ContactInfo, value: string) {
        setFormState((formState) => ({
            ...formState,
            [property]: value,
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const isFormValid = event.currentTarget.checkValidity();
        if (isFormValid) {
            onSubmit(formState);
        }
    }

    useEffect(() => {
        if (contact) {
            setFormState(contact);
        }
    }, [contact]);

    return (
        <form onSubmit={handleSubmit}>
            {contact && contact.avatar_url && (
                <Avatar className={styles.avatar} size="large" square src={contact.avatar_url} />
            )}
            <div className={styles.row}>
                <Field
                    autoFocus
                    label="Name"
                    maxLength={TEXT_MAX_LENGTH}
                    name="name"
                    onChange={handleChange}
                    placeholder="Elvis Presley"
                    required
                    value={formState.name}
                />
                <Field
                    label="Email"
                    maxLength={TEXT_MAX_LENGTH}
                    name="email"
                    onChange={handleChange}
                    placeholder="elvis@prezly.com"
                    type="email"
                    value={formState.email}
                />
            </div>
            <div className={styles.row}>
                <Field
                    label="Company"
                    maxLength={TEXT_MAX_LENGTH}
                    name="company"
                    onChange={handleChange}
                    placeholder="Prezly"
                    value={formState.company}
                />
                <Field
                    label="Function"
                    name="description"
                    onChange={handleChange}
                    placeholder="Singer"
                    value={formState.description}
                />
            </div>
            <div className={styles.row}>
                <Field
                    label="Phone"
                    maxLength={TEXT_MAX_LENGTH}
                    name="phone"
                    onChange={handleChange}
                    placeholder="(225) 555-0118"
                    type="phone"
                    value={formState.phone}
                />
                <Field
                    label="Mobile"
                    maxLength={TEXT_MAX_LENGTH}
                    name="mobile"
                    onChange={handleChange}
                    placeholder="(225) 555-0118"
                    type="phone"
                    value={formState.mobile}
                />
            </div>
            <div className={styles.row}>
                <Field
                    label="Website"
                    maxLength={TEXT_MAX_LENGTH}
                    name="website"
                    onChange={handleChange}
                    placeholder="prezly.com"
                    value={formState.website}
                />
            </div>
            <div className={styles.row}>
                <Field
                    label="Facebook"
                    maxLength={TEXT_MAX_LENGTH}
                    name="facebook"
                    onChange={handleChange}
                    placeholder="Username or link to profile/page"
                    value={formState.facebook}
                />
                <Field
                    label="Twitter"
                    maxLength={TEXT_MAX_LENGTH}
                    name="twitter"
                    onChange={handleChange}
                    placeholder="Username or link to profile"
                    value={formState.twitter}
                />
            </div>
            <Button className={classNames(styles.button, styles.submit)} type="submit" round>
                {isEditing ? 'Update' : 'Create'} contact
            </Button>
            <Button className={styles.button} variant="clear" onClick={onClose} round>
                Cancel
            </Button>
        </form>
    );
}

function Field(props: {
    autoFocus?: true;
    label: string;
    maxLength?: number;
    name: keyof ContactInfo;
    onChange: (name: keyof ContactInfo, value: string) => void;
    placeholder: string;
    required?: true;
    type?: 'email' | 'phone';
    value: string;
}) {
    const id = `inline-contact-form-${props.name}`;
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(value: string) {
        props.onChange(props.name, value);
    }

    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={id}>
                {props.label}
            </label>
            <Input
                autoFocus={props.autoFocus}
                id={id}
                onChange={handleChange}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
                required={props.required}
                ref={inputRef}
                type={props.type}
                value={props.value}
            />
        </div>
    );
}
