import classNames from 'classnames';
import React from 'react';
import type { ReactNode } from 'react';

import { Button, HStack } from '#components';
import { Info } from '#icons';

import styles from './InfoText.module.scss';

interface Props {
    className?: string;
    children?: ReactNode;
}

export function InfoText({ className, children }: Props) {
    return (
        <div className={classNames(styles.InfoText, className)}>
            <HStack spacing="1">
                <Info height={14} />
                <span>{children}</span>
            </HStack>
        </div>
    );
}

export namespace InfoText {
    export type Text = string;
    export type Link = { text: Text; href: string };
    export type Button = { text: Text; onClick: () => void };
    export type StructuredContent = Array<Text | Link | Button>;

    export function Structured(props: Omit<Props, 'children'> & { children: StructuredContent }) {
        const { children, ...rest } = props;
        return (
            <InfoText {...rest}>
                {children.map((child, idx) => (
                    <Child key={idx}>{child}</Child>
                ))}
            </InfoText>
        );
    }
}

function Child(props: { children: InfoText.Text | InfoText.Link | InfoText.Button }) {
    const content = props.children;

    if (typeof content === 'string') {
        return <>{content}</>;
    }

    if ('href' in content) {
        return (
            <Button href={content.href} type="link" variant="underlined">
                {content.text}
            </Button>
        );
    }

    return (
        <Button onClick={content.onClick} variant="underlined">
            {content.text}
        </Button>
    );
}
