import { Render } from '@prezly/slate-renderer';
import React from 'react';

import story from './story.json';
import styles from './index.module.scss';

const Index = () => {
    return (
        <div className={styles.article}>
            <Render nodes={story as any} />
        </div>
    );
};

export default Index;
