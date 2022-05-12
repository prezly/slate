import type { ReactNode } from 'react';
import React from 'react';

import { Cross } from '#icons';

import { Button } from '../Button';
import { VStack } from '../Stack';

import styles from './ElementPlaceholder.module.scss';

interface Props {
    title: string;
    illustration: ReactNode;
    onDismiss?: () => void;
    subtitle?: string;
}

export function ElementPlaceholder({ onDismiss, title, subtitle, illustration }: Props) {
    return (
        <div className={styles.container}>
            <Button
                className={styles.closeIcon}
                variant="secondary"
                icon={Cross}
                round
                onClick={onDismiss}
            />
            <VStack spacing="2">
                <div className={styles.illustration}>{illustration}</div>
                <VStack spacing="1">
                    <div className={styles.title}>{title}</div>
                    {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                </VStack>
            </VStack>
        </div>
    );
}
