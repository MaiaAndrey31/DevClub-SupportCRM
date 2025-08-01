import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  @media (max-width: 700px) {
    box-shadow: none;
    padding-bottom: 1rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    padding: 1.2rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: var(--text-color);
    font-weight: 400;
  }
  th {
    background-color: rgba(0, 12, 36, 0.6);
    font-weight: 600;
  }
  .btn-icon {
    display: inline-flex;
    margin-right: 0.5rem;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #28a745 ;
    border: none;
    color: white;
    cursor: pointer;
    transition: var(--transition);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  @media (max-width: 700px) {
    th, td {
      padding: 0.7rem 0.6rem;
      font-size: 0.97rem;
    }
    th {
      font-size: 1.5rem;
    }
    .btn-icon {
      width: 32px;
      height: 32px;
      margin-right: 0.2rem;
    }
  }
  @media (max-width: 500px) {
    th, td {
      padding: 0.5rem 0.2rem;
      font-size: 0.92rem;
    }
    .btn-icon {
      width: 28px;
      height: 28px;
    }
  }
`;