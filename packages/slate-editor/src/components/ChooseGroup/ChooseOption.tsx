import * as React from 'react';
import styled, { css } from 'styled-components';

export interface ChooseGroupOption<T extends string> {
    label: string;
    value: T;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement> & { isActive: boolean }>;
}

interface Choose<T> {
    selected?: T;
    onChange?: (value: T | undefined) => void;
}

export interface CheckboxChoose<T extends string> extends Choose<(T | undefined)[]> {
    type: 'checkbox';
}

export interface RadioChoose<T extends string> extends Choose<T> {
    type: 'radio';
}

type ChooseOptionProps<T extends string> = (CheckboxChoose<T> | RadioChoose<T>) & {
    name: string;
    option: ChooseGroupOption<T>;
    allSelected: Set<T | undefined>;
};

export function ChooseOption<T extends string>(props: ChooseOptionProps<T>) {
    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.type === 'checkbox') {
                const newSelected = new Set(props.allSelected);

                if (e.currentTarget.checked) {
                    newSelected.add(props.option.value);
                } else {
                    newSelected.delete(props.option.value);
                }

                const selectedArr = Array.from(newSelected.values());
                props.onChange?.(selectedArr);
            } else {
                props.onChange?.(props.option.value);
            }
        },
        [props.type, props.allSelected, props.option, props.onChange],
    );

    const isActive = props.allSelected.has(props.option.value);

    return (
        <Label isActive={isActive}>
            <HiddenInput
                name={props.name}
                type={props.type}
                checked={isActive}
                onChange={onChange}
            />
            {props.option.Icon && <Icon as={props.option.Icon} isActive={isActive} />}

            <LabelText>{props.option.label}</LabelText>
        </Label>
    );
}

const Label = styled.label<{ isActive: boolean }>`
    cursor: pointer;
    display: inline-flex;
    flex-flow: column;
    align-items: center;
    font-size: 14px;

    ${(props) =>
        props.isActive
            ? css`
                  color: #f9ca7b;
                  opacity: 1;
              `
            : css`
                  color: white;
                  opacity: 0.5;
              `};

    &:hover,
    &:focus {
        opacity: 1;
    }
`;

const Icon = styled.span``;

const HiddenInput = styled.input`
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
`;

const LabelText = styled.span`
    margin-top: 8px;
`;
