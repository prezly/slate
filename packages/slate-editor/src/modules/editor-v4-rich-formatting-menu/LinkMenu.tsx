import type { LinkNode } from '@prezly/slate-types';
import { isHotkey } from 'is-hotkey';
import * as React from 'react';
import { useState } from 'react';
import { RootCloseWrapper } from 'react-overlays';

import { Button, Input, Toggle, Toolbox, VStack } from '#components';
import { Delete, Link } from '#icons';

interface Props {
    node: LinkNode | null;
    canUnlink: boolean;
    onBlur: () => void;
    onChange: (props: Pick<LinkNode, 'href' | 'new_tab'>) => void;
    onClose: () => void;
    onUnlink: () => void;
}

const isEnter = isHotkey('Enter');

export function LinkMenu({ node, canUnlink, onBlur, onChange, onClose, onUnlink }: Props) {
    const [href, setHref] = useState(node?.href ?? '');
    const [new_tab, setNewTab] = useState(node?.new_tab ?? false);

    function handleSave() {
        onChange({ href, new_tab });
    }

    return (
        <RootCloseWrapper onRootClose={onBlur}>
            <Toolbox.Panel style={{ width: 320 }}>
                <Toolbox.Header withCloseButton onCloseClick={onClose}>
                    Link settings
                </Toolbox.Header>
                <Toolbox.Section>
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
                                        onKeyDown={(event) => {
                                            if (isEnter(event)) {
                                                event.preventDefault();
                                                handleSave()
                                            }
                                        }}
                                        icon={Link}
                                        placeholder="Paste link"
                                    />
                                </VStack>

                                <Toggle name="new_tab" value={new_tab} onChange={setNewTab}>
                                    Open in new tab
                                </Toggle>
                            </VStack>

                            <Button
                                variant="primary"
                                type="submit"
                                fullWidth
                                round
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </VStack>
                    </VStack>
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
        </RootCloseWrapper>
    );
}
