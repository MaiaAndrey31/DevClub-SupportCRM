import styled from 'styled-components';


export const Layout = styled.div`

  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;
export const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;