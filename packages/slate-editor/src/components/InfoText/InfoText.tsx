import * as React from 'react';

import { HStack } from '#components';
import { Info } from '#icons';

import styles from './InfoText.module.scss';

export function InfoText(props: React.PropsWithChildren<Record<string, unknown>>) {
    return (
        <div className={styles['info-text']}>
            <HStack spacing="1">
                <Info height={14} />
                <span>{props.children}</span>
            </HStack>
        </div>
    );
}
