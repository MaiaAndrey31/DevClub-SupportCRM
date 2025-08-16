import styled from "styled-components";
import theme from "../../styles/theme";

// Layout components
export const Layout = styled.div`
  background: linear-gradient(135deg, #000c24 0%, #3e5c9e 100%);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  overflow-y: auto;
`;

export const HomeContainer = styled.div`
  height: 100%;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: ${theme.colors.purple};
  border-radius: 8px;
  box-shadow: 0 0 8px inset ${theme.colors.prata};
  padding: 1.5rem 1rem;
    margin: 1rem auto;

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
  text-align: center;
  text-shadow: 1px 0px 5px rgba(0, 0, 0, 0.7);
`;

export const ButtonSlide = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #FFF;
  border: 2px groove ${theme.colors.accent};
  border-radius: 8px;
  padding: 1px 6px;
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 0 12px inset ${theme.colors.accent};
  transition: ease-out 0.3s;
  -webkit-transition: ease-out 0.3s;
  -moz-transition: ease-out 0.3s;
  background: transparent;

  &:hover {
    box-shadow:  0px 0px 25px 0 ${theme.colors.accent};
  }
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: .5rem;
  background-color: ${theme.colors.primaryDark};
  border-radius: ${theme.borderRadius};
box-shadow: 0 0 5px inset ${theme.colors.accent};
transition: var(--transition);
cursor: pointer;

  button {
    display: flex;
    height: 140px;
    width: 140px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  p {
    font-size: 1rem;
    font-weight: 700;
    color: ${theme.colors.text};
  }
`;
