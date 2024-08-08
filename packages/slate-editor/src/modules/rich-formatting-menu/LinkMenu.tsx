import type { LinkNode } from '@prezly/slate-types';
import * as React from 'react';
import { useState } from 'react';
import { useRootClose } from 'react-overlays';

import type { OptionsGroupOption } from '#components';
import { Button, Input, Menu, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import { Delete, Link } from '#icons';
import {
    EMAIL_REGEXP,
    HREF_REGEXP,
    humanFriendlyEmailUrl,
    MAILTO_REGEXP,
    normalizeHref,
    normalizeMailtoHref,
} from '#lib';

import type { InlineLinksExtensionConfiguration } from '#extensions/inline-links';

import styles from './LinkMenu.module.scss';
import type { FetchOEmbedFn, LinkType, Presentation } from './types';

const PRESENTATION_OPTIONS: OptionsGroupOption<Presentation>[] = [
    {
        value: 'embed',
        label: 'Embed',
    },
    {
        value: 'card',
        label: 'Bookmark',
    },
    {
        value: 'link',
        label: 'Link',
    },
];

interface Props {
    node: LinkNode | null;
    canUnlink: boolean;
    withConversionOptions: false | { fetchOembed: FetchOEmbedFn };
    withNewTabOption: boolean;
    onBlur: () => void;
    onChange: (props: Pick<LinkNode, 'href' | 'new_tab'>) => void;
    onClose: () => void;
    onConvert?: (presentation: Presentation) => void;
    onUnlink: () => void;
    predefinedLinks: InlineLinksExtensionConfiguration['predefinedLinks'];
}

export function LinkMenu({
    node,
    canUnlink,
    withConversionOptions,
    withNewTabOption,
    onBlur,
    onChange,
    onClose,
    onConvert,
    onUnlink,
    predefinedLinks,
}: Props) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [href, setHref] = useState(node?.href ?? '');
    const [newTab, setNewTab] = useState(node?.new_tab ?? true);
    const [type, setType] = useState<LinkType>(detectLinkType(href, predefinedLinks));

    const isConvertable = type === 'url';

    function handleSave() {
        let normalizedHref = href;
        if (type === 'url') {
            normalizedHref = normalizeHref(href);
        }

        if (type === 'email') {
            normalizedHref = normalizeMailtoHref(href);
        }

        onChange({
            href: normalizedHref,
            new_tab: newTab,
        });
    }

    function handleChangeType(nextType: LinkType) {
        if (nextType === 'predefined' && predefinedLinks) {
            setType(nextType);
            setHref(predefinedLinks.options[0].value);
            return;
        }

        setType(nextType);
        setHref('');
    }

    function getTypeOptions(): OptionsGroupOption<LinkType>[] {
        const options: OptionsGroupOption<LinkType>[] = [
            { label: 'Web', value: 'url' },
            { label: 'Email', value: 'email' },
        ];

        if (predefinedLinks) {
            return [...options, { label: predefinedLinks.label, value: 'predefined' }];
        }

        return options;
    }

    useRootClose(rootRef, onBlur);

    return (
        <Toolbox.Panel style={{ width: 280 }} ref={rootRef}>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Link settings
            </Toolbox.Header>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSave();
                }}
            >
                <Toolbox.Section>
                    <VStack spacing="2">
                        <VStack spacing="2-5">
                            <VStack spacing="1-5">
                                <Toolbox.Caption>Link to</Toolbox.Caption>
                                <Menu.Dropdown
                                    className={styles.dropdown}
                                    onChange={handleChangeType}
                                    options={getTypeOptions()}
                                    value={type}
                                    variant="light"
                                />
                                {type === 'url' && (
                                    <Input
                                        autoFocus
                                        name="href"
                                        value={href}
                                        onChange={setHref}
                                        icon={Link}
                                        pattern={HREF_REGEXP.source}
                                        placeholder="Paste link"
                                        title="Please input a valid URL"
                                    />
                                )}
                                {type === 'email' && (
                                    <Input
                                        autoFocus
                                        name="email"
                                        value={humanFriendlyEmailUrl(href)}
                                        onChange={setHref}
                                        pattern={EMAIL_REGEXP.source}
                                        placeholder="Paste email address"
                                        type="email"
                                        title="Please input a valid email address"
                                    />
                                )}
                                {type === 'predefined' && predefinedLinks && (
                                    <Menu.Dropdown
                                        className={styles.dropdown}
                                        onChange={setHref}
                                        options={predefinedLinks.options}
                                        value={href}
                                        variant="light"
                                    />
                                )}
                            </VStack>

                            {withNewTabOption && (
                                <Toggle name="new_tab" value={newTab} onChange={setNewTab}>
                                    Open in new tab
                                </Toggle>
                            )}
                        </VStack>
                    </VStack>
                </Toolbox.Section>

                {withConversionOptions && onConvert && isConvertable && (
                    <Toolbox.Section caption="Change to...">
                        <OptionsGroup
                            name="presentation"
                            options={PRESENTATION_OPTIONS}
                            selectedValue="link"
                            onChange={onConvert}
                            variant="pills"
                        />
                    </Toolbox.Section>
                )}

                <Toolbox.Section>
                    <Button
                        variant="primary"
                        type="submit"
                        fullWidth
                        round
                        size="small"
                        disabled={!href}
                    >
                        Save
                    </Button>
                </Toolbox.Section>
            </form>
            <Toolbox.Footer>
                <Button
                    variant="clear"
                    icon={Delete}
                    fullWidth
                    disabled={!canUnlink}
                    onClick={onUnlink}
                >
                    Unlink text
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}

function detectLinkType(
    href: string,
    predefinedLinks: InlineLinksExtensionConfiguration['predefinedLinks'],
): LinkType {
    if (predefinedLinks && predefinedLinks.options.some(({ value }) => href === value)) {
        return 'predefined';
    }

    if (MAILTO_REGEXP.test(href)) {
        return 'email';
    }

    return 'url';
}
