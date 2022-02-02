import { SlateEditorThemeProvider } from '../src/themes/SlateEditorThemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

export const decorators = [
    (Story) => (
        <SlateEditorThemeProvider>
            <Story />
        </SlateEditorThemeProvider>
    ),
];
