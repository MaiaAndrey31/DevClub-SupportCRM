import styled from 'styled-components';
import { Link } from "react-router-dom";
import theme from '../../styles/theme';

export const HeaderContainer = styled.header`
  background-color: transparent;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  color: var(--white);


  @media (max-width: 800px) {
    padding: 0.7rem 1rem;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem;
  }
`;

export const HeaderLink = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
color: ${props => props.$isActive ? `${theme.colors.text}` : `${theme.colors.textMuted}`};
border-bottom:${props => props.$isActive ? `4px solid ${theme.colors.accent}` : 'none'};
padding-bottom: 5px;
text-decoration: none;
font-size: 19px;

transition: color 300ms;

&:hover {
    color: ${theme.colors.accent};
}
`

export const Navigation = styled.nav`
display: flex;
align-items: center;
justify-content: space-around;
height: 72px;

div  {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    hr {
        height: 24px;
        border: 1px solid ${theme.colors.primary};
    }
}
`;

export const LogoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f5f7fb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  img {
    width: 90px;
    height: 80px;
    @media (max-width: 600px) {
      width: 60px;
      height: 50px;
    }
    @media (max-width: 400px) {
      width: 44px;
      height: 38px;
    }
  }
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffc107;
    box-shadow: 0 0 10px rgba(40, 167, 69, 0.5);
    transition: background 0.3s;
  }
  &.connected .status-dot { background: #28a745; }
  &.error .status-dot { background: #dc3545; }
  
  @media (max-width: 500px) {
    gap: 0.3rem;
    .status-dot {
      width: 10px;
      height: 10px;
    }
  }
`;

export const Logout = styled.div`

cursor:pointer;

`