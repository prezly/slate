import type { LinkNode } from '@prezly/slate-types';
import * as React from 'react';
import { useState } from 'react';
import { useRootClose } from 'react-overlays';

import type { OptionsGroupOption } from '#components';
import { Button, Input, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import { Delete, Link } from '#icons';
import { HREF_REGEXP, normalizeHref } from '#lib';

import type { FetchOEmbedFn, Presentation } from './types';

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
    onConvert?: (presentation: Presentation) => Promise<void> | void;
    onUnlink: () => void;
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
}: Props) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [href, setHref] = useState(node?.href ?? '');
    const [new_tab, setNewTab] = useState(node?.new_tab ?? true);

    function handleSave() {
        onChange({ href: normalizeHref(href), new_tab });
    }

    useRootClose(rootRef, onBlur);

    return (
        <Toolbox.Panel style={{ width: 320 }} ref={rootRef}>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Link settings
            </Toolbox.Header>
            <Toolbox.Section>
                <form
                    onSubmit={function (event) {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    <VStack spacing="2">
                        <VStack spacing="2">
                            <VStack spacing="2-5">
                                <VStack spacing="1-5">
                                    <Toolbox.Caption>Link</Toolbox.Caption>
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
                                </VStack>

                                {withNewTabOption && (
                                    <Toggle name="new_tab" value={new_tab} onChange={setNewTab}>
                                        Open in new tab
                                    </Toggle>
                                )}

                                {withConversionOptions && onConvert && (
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
                            </VStack>

                            <Button
                                variant="primary"
                                type="submit"
                                fullWidth
                                round
                                disabled={!href}
                            >
                                Save
                            </Button>
                        </VStack>
                    </VStack>
                </form>
            </Toolbox.Section>
            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
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
