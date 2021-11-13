import { Renderer } from '@prezly/content-renderer-react-js';
import React from 'react';

import story from './story.json';
import styles from './index.module.scss';

const Index = () => {
    return (
        <div className={styles.article}>
            <Renderer nodes={story as any} />
        </div>
    );
};

export default Index;
