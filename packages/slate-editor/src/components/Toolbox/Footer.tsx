import styled from 'styled-components';

export const Footer = styled.div`
    display: flex;
    background: ${(props) => props.theme.toolbox.background};
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom-left-radius: ${(props) => props.theme.toolbox.borderRadius};
    border-bottom-right-radius: ${(props) => props.theme.toolbox.borderRadius};
    padding: ${(props) => props.theme.toolbox.padding};
`;
