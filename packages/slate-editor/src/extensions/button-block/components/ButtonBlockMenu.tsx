import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import {
    Accordion,
    Button,
    Input,
    type OptionsGroupOption,
    Toggle,
    Toolbox,
    VStack,
    OptionsGroup,
    InfoText,
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

import { ButtonBlockNode } from '../ButtonBlockNode';

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
    onReposition: () => void;
    value: FormState;
    withNewTabOption: boolean;
    info?: InfoText.StructuredContent;
}

const BUTTON_MENU_VARIANT_OPTIONS: OptionsGroupOption<ButtonBlockNode.Variant>[] = [
    {
        value: ButtonBlockNode.Variant.DEFAULT,
        label: 'Filled',
    },
    {
        value: ButtonBlockNode.Variant.OUTLINE,
        label: 'Outlined',
    },
];

const BUTTON_LAYOUT_OPTIONS: OptionsGroupOption<ButtonBlockNode.Layout>[] = [
    {
        value: ButtonBlockNode.Layout.LEFT,
        label: 'Left',
        icon: ({ isActive }) => (
            <ButtonLayoutLeft className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: ButtonBlockNode.Layout.CENTER,
        label: 'Center',
        icon: ({ isActive }) => (
            <ButtonLayoutCenter
                className={classNames(styles.icon, { [styles.active]: isActive })}
            />
        ),
    },
    {
        value: ButtonBlockNode.Layout.RIGHT,
        label: 'Right',
        icon: ({ isActive }) => (
            <ButtonLayoutRight className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
    {
        value: ButtonBlockNode.Layout.WIDE,
        label: 'Wide',
        icon: ({ isActive }) => (
            <ButtonLayoutWide className={classNames(styles.icon, { [styles.active]: isActive })} />
        ),
    },
];

export function ButtonMenu({
    info = [],
    onUpdate,
    onClose,
    onRemove,
    onReposition,
    value,
    withNewTabOption,
}: Props) {
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

            {info.length > 0 && (
                <Toolbox.Section>
                    <InfoText.Structured className={styles.info}>{info}</InfoText.Structured>
                </Toolbox.Section>
            )}

            <Toolbox.Section>
                <VStack spacing="1-5">
                    <VStack spacing="1-5">
                        <Toolbox.Caption>Text</Toolbox.Caption>
                        <Input
                            name="label"
                            onChange={onLabelChange}
                            placeholder="Button"
                            value={label}
                        />
                    </VStack>

                    <VStack spacing="1-5">
                        <VStack spacing="1-5">
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

            <Accordion title="Styling options" onExpand={onReposition}>
                <VStack spacing="2">
                    <OptionsGroup
                        name="variant"
                        onChange={(variant) => onUpdate({ variant })}
                        options={BUTTON_MENU_VARIANT_OPTIONS}
                        selectedValue={value.variant}
                        variant="pills"
                    />

                    <VStack spacing="1-5">
                        <Toolbox.Caption>Alignment</Toolbox.Caption>
                        <OptionsGroup
                            name="layout"
                            onChange={(layout) => onUpdate({ layout })}
                            options={BUTTON_LAYOUT_OPTIONS}
                            selectedValue={value.layout}
                        />
                    </VStack>
                </VStack>
            </Accordion>

            <Toolbox.Footer>
                <Button variant="clear" icon={Delete} fullWidth onClick={onRemove}>
                    Remove
                </Button>
            </Toolbox.Footer>
        </>
    );
}
