import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import {
    Button,
    Input,
    type OptionsGroupOption,
    Toggle,
    Toolbox,
    VStack,
    OptionsGroup,
} from '#components';
import {
    ButtonLayoutCenter,
    ButtonLayoutLeft,
    ButtonLayoutRight,
    ButtonLayoutWide,
    Delete,
    Link,
} from '#icons';
import { HREF_REGEXP, normalizeHref } from '#lib';

import type { ButtonBlockNode } from '../ButtonBlockNode';

import styles from './ButtonBlockMenu.module.scss';

export enum Size {
    SMALL = 'small',
    BEST_FIT = 'best-fit',
    ORIGINAL = 'original',
}

export interface FormState {
    href: ButtonBlockNode['href'];
    label: ButtonBlockNode['label'];
    layout: ButtonBlockNode['layout'];
    variant: ButtonBlockNode['variant'];
    new_tab: ButtonBlockNode['new_tab'];
}

interface Props {
    onUpdate: (props: Partial<FormState>) => void;
    onClose: () => void;
    onRemove: () => void;
    value: FormState;
    withNewTabOption: boolean;
}

const BUTTON_MENU_VARIANT_OPTIONS: OptionsGroupOption<ButtonBlockNode.ButtonVariant>[] = [
    {
        value: 'default',
        label: 'Filled',
    },
    {
        value: 'outline',
        label: 'Outlined',
    },
];

const BUTTON_LAYOUT_OPTIONS: OptionsGroupOption<ButtonBlockNode.ButtonLayout>[] = [
    {
        value: 'left',
        label: 'Left',
        icon: ({ isActive }) => (
            <ButtonLayoutLeft className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: 'center',
        label: 'Center',
        icon: ({ isActive }) => (
            <ButtonLayoutCenter
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: 'right',
        label: 'right',
        icon: ({ isActive }) => (
            <ButtonLayoutRight className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: 'full-width',
        label: 'Wide',
        icon: ({ isActive }) => (
            <ButtonLayoutWide className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
];

export function ButtonMenu({ onUpdate, onClose, onRemove, value, withNewTabOption }: Props) {
    const [href, setHref] = useState(value.href);
    const [label, setLabel] = useState(value.label);

    const onHrefChange = useCallback(
        function (href: string, valid: boolean) {
            setHref(href);
            if (valid) {
                onUpdate({ href: normalizeHref(href) });
            }
        },
        [onUpdate],
    );

    const onLabelChange = useCallback(
        function (label: string) {
            setLabel(label);
            onUpdate({ label });
        },
        [onUpdate],
    );

    useEffect(
        function () {
            if (normalizeHref(value.href) !== normalizeHref(href)) {
                setHref(value.href);
            }
        },
        [value.href],
    );

    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Button settings
            </Toolbox.Header>

            <Toolbox.Section>
                <VStack spacing="2-5">
                    <VStack spacing="2-5">
                        <Toolbox.Caption>Text</Toolbox.Caption>
                        <Input
                            name="label"
                            onChange={onLabelChange}
                            placeholder="Button"
                            value={label}
                        />
                    </VStack>

                    <VStack spacing="2-5">
                        <VStack spacing="2-5">
                            <Toolbox.Caption>Link</Toolbox.Caption>
                            <Input
                                icon={Link}
                                name="href"
                                onChange={onHrefChange}
                                pattern={HREF_REGEXP.source}
                                placeholder="Add URL or choose a page"
                                value={href}
                            />
                        </VStack>

                        {withNewTabOption && (
                            <Toggle
                                disabled={!href}
                                name="new_tab"
                                onChange={(new_tab) => onUpdate({ new_tab })}
                                value={href ? Boolean(value.new_tab) : false}
                            >
                                Open in new tab
                            </Toggle>
                        )}
                    </VStack>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Section>
                <VStack spacing="2-5">
                    <VStack spacing="2-5">
                        <Toolbox.Caption>Styling options</Toolbox.Caption>
                        <OptionsGroup
                            name="variant"
                            onChange={(variant) => onUpdate({ variant })}
                            options={BUTTON_MENU_VARIANT_OPTIONS}
                            selectedValue={value.variant}
                            variant="pills"
                        />
                    </VStack>

                    <VStack spacing="2-5">
                        <Toolbox.Caption>Alignment</Toolbox.Caption>
                        <OptionsGroup
                            name="layout"
                            onChange={(layout) => onUpdate({ layout })}
                            optionClassName={styles.layoutOption}
                            options={BUTTON_LAYOUT_OPTIONS}
                            selectedValue={value.layout}
                        />
                    </VStack>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear" icon={Delete} fullWidth onClick={onRemove}>
                    Remove
                </Button>
            </Toolbox.Footer>
        </>
    );
}
