import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  @media (max-width: 500px) {
    gap: 0.2rem;
    justify-content: center;
    font-size: 0.95rem;
  }
`;

export const Button = styled.button`
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-width: 36px;
  @media (max-width: 500px) {
    padding: 0.4rem 0.6rem;
    min-width: 28px;
    font-size: 0.95rem;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;