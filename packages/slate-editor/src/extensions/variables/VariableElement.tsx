import { isVariableNode, type VariableNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { Button, Input, Menu as BaseMenu, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { usePopperOptionsContext } from '#modules/popper-options-context';

import { Menu } from '../../components/EditorBlock';

import { removeVariable, updateVariable } from './transforms';
import type { Variable } from './types';
import styles from './VariableElement.module.scss';

interface Props extends RenderElementProps {
    element: VariableNode;
    variables: Variable[];
}

export function VariableElement({ attributes, children, element, variables }: Props) {
    const selected = useSelected();
    const editor = useSlateStatic();
    const popperOptions = usePopperOptionsContext();

    const [fallback, setFallback] = useState<string>(element.fallback ?? '');
    const [container, setContainer] = useState<HTMLSpanElement | null>(null);

    const selectedNodes = Array.from(editor.nodes({ mode: 'lowest' }));
    const isOnlyVariableSelected =
        selectedNodes.length === 1 && selectedNodes.every(([node]) => isVariableNode(node));

    const options = variables.map((variable) => ({
        value: variable.key,
        label: variable.text,
        withFallback: variable.withFallback,
    }));
    const option = options.find(({ value }) => value === element.key);

    function handleChangeType(newType: string) {
        updateVariable(editor, { key: newType });
    }

    function handleSave() {
        updateVariable(editor, { fallback: fallback !== '' ? fallback : null });
    }

    function handleRemove() {
        removeVariable(editor);
    }

    useEffect(() => {
        if (selected) {
            setFallback(element.fallback ?? '');
        }
    }, [selected]);

    useEffect(() => {
        if (!option?.withFallback) {
            updateVariable(editor, { fallback: null });
        }
    }, [option?.withFallback]);

    return (
        <>
            {selected && isOnlyVariableSelected && container && (
                <Menu
                    popperOptions={{ ...popperOptions, modifiers: { arrow: { padding: 0 } } }}
                    reference={container}
                >
                    <Toolbox.Header>Variable settings</Toolbox.Header>
                    {options.length > 1 && (
                        <Toolbox.Section>
                            <VStack spacing="2">
                                <Toolbox.Caption>Type</Toolbox.Caption>
                                <BaseMenu.Dropdown
                                    className={styles.Dropdown}
                                    onChange={handleChangeType}
                                    options={options}
                                    value={element.key}
                                    variant="light"
                                />
                            </VStack>
                        </Toolbox.Section>
                    )}
                    {option?.withFallback && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSave();
                            }}
                        >
                            <Toolbox.Section>
                                <VStack spacing="2">
                                    <Toolbox.Caption>Fallback</Toolbox.Caption>
                                    <Input
                                        name="fallback"
                                        value={fallback}
                                        onChange={setFallback}
                                        placeholder="Define your fallback"
                                    />
                                    <Button
                                        disabled={fallback === element.fallback}
                                        variant="primary"
                                        type="submit"
                                        size="small"
                                        fullWidth
                                        round
                                    >
                                        Save
                                    </Button>
                                </VStack>
                            </Toolbox.Section>
                        </form>
                    )}
                    <Toolbox.Footer>
                        <Button variant="clear" icon={Delete} fullWidth onClick={handleRemove}>
                            Remove
                        </Button>
                    </Toolbox.Footer>
                </Menu>
            )}
            <span
                {...attributes}
                className={classNames(styles.VariableElement, {
                    [styles.selected]: selected,
                })}
                ref={(ref) => {
                    setContainer(ref);
                    attributes.ref(ref);
                }}
            >
                {option?.label}
                {element.fallback && ` or "${element.fallback}"`}
                {children}
            </span>
        </>
    );
}
