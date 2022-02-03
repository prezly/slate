import styled from 'styled-components';

export const Footer = styled.div`
    display: flex;
    overflow: hidden;
    background: ${(props) => props.theme.toolbox.background};
    border-top: 1px solid ${(props) => props.theme.toolbox.delimiterColor};
    border-bottom-left-radius: ${(props) => props.theme.toolbox.borderRadius};
    border-bottom-right-radius: ${(props) => props.theme.toolbox.borderRadius};
`;
