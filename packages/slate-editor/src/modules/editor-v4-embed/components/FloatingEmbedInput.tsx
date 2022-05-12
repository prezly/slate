import type { ChangeEvent, RefObject } from 'react';
import React, { useRef, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

import { useEffectOnce } from '#lib';

import { FloatingContainer } from '#modules/editor-v4-components';

import './FloatingEmbedInput.scss';

interface Props {
    availableWidth: number;
    containerRef: RefObject<HTMLDivElement>;
    onClose: () => void;
    onRootClose: () => void;
    onSubmit: (url: string) => Promise<void>;
    submitButtonLabel: string;
}

export function FloatingEmbedInput({
    availableWidth,
    containerRef,
    onClose,
    onRootClose,
    onSubmit,
    submitButtonLabel,
}: Props) {
    const inputRef = useRef<HTMLInputElement>();
    const [url, setUrl] = useState<string>('');

    useEffectOnce(() => {
        // This fixes an issue where input element is not autofocused on mount.
        // No, I have no idea why we need to call `select()`, or why this needs a `setTimeout`.
        // See: https://github.com/prezly/prezly/pull/8354#discussion_r476235647
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.select();
            }
        }, 0);
    });

    return (
        <FloatingContainer.Container
            availableWidth={availableWidth}
            className="editor-v4-floating-embed-input"
            containerRef={containerRef}
            onClose={onRootClose}
            open
            show
        >
            <FloatingContainer.Button
                className="editor-v4-floating-embed-input__close-button"
                onClick={onClose}
                open
            />
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(url);
                }}
            >
                <InputGroup>
                    <FormControl
                        // `autoFocus` has to be `false` - otherwise page automatically scrolls
                        // to the top the moment `LinkMenu` is mounted (because underlying
                        // `ElementPortal` is initially rendered at the top and gets positioned
                        // correctly only at subsequent render with `useEffect`). We simulate
                        // the `autoFocus` behavior with `useEffectOnce` anyway
                        // (for a different reason though).
                        autoFocus={false}
                        className="editor-v4-floating-embed-input__input"
                        inputRef={(ref) => {
                            inputRef.current = ref;
                        }}
                        onChange={(event: ChangeEvent<FormControl & HTMLInputElement>) =>
                            setUrl(event.target.value)
                        }
                        placeholder="Enter your URL to embed & press Enter (e.g. https://example.com)"
                        required
                        type="url"
                        value={url}
                    />
                    <InputGroup.Addon className="editor-v4-floating-embed-input__addon">
                        <Button
                            bsStyle="success"
                            className="editor-v4-floating-embed-input__button"
                            disabled={url.length === 0}
                            type="submit"
                        >
                            {submitButtonLabel}
                        </Button>
                    </InputGroup.Addon>
                </InputGroup>
            </form>
        </FloatingContainer.Container>
    );
}
