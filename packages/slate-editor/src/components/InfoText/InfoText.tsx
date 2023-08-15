import classNames from 'classnames';
import * as React from 'react';

import { HStack } from '#components';
import { Info } from '#icons';

import styles from './InfoText.module.scss';

interface Props {
    className?: string;
}

export function InfoText(props: React.PropsWithChildren<Props>) {
    return (
        <div className={classNames(styles['info-text'], props.className)}>
            <HStack spacing="1">
                <Info height={14} />
                <span>{props.children}</span>
            </HStack>
        </div>
    );
}
