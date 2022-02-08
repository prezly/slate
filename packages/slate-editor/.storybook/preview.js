import styled from 'styled-components';
import { SlateEditorThemeProvider } from '../src/themes/SlateEditorThemeProvider';
import '../build/styles/styles.css';

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
            <GlobalStoryStyles>
                <Story />
            </GlobalStoryStyles>
        </SlateEditorThemeProvider>
    ),
];

const GlobalStoryStyles = styled.div`
    font-family: Inter;
`;
