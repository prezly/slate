import type { Theme } from '@prezly/slate-editor/theme';

export const theme: Theme = {
    text: {
        sizes: {
            xs: '12px',
            s: '14px',
            m: '16px',
            l: '18px',
        },
        colors: {
            primary: 'white',
        },
    },
    toolbox: {
        background: 'rgba(27, 27, 54, 0.96)',
        borderRadius: '12px',
        padding: '16px',
        textColorName: 'primary',
        delimiterColor: 'rgba(255, 255, 255, 0.12)',
    },
    box: {
        spacing: {
            none: '0',
            xs: '4px',
            s: '8px',
            sm: '12px',
            m: '16px',
            lm: '24px',
            l: '32px',
        },
    },
    stack: {
        spacing: {
            none: '0',
            xs: '4px',
            s: '8px',
            sm: '12px',
            m: '16px',
            lm: '24px',
            l: '32px',
        },
    },
};
