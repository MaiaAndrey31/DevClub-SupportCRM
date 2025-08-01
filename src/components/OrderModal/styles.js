import styled from 'styled-components';
import theme from '../../styles/theme';

export const ModalOverlay = styled.div`
  display: ${({ $show }) => ($show ? 'flex' : 'none')};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 12, 36, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2rem 1rem;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s;

  h2 {
    color: ${theme.colors.accent};
    font-size: 1.8rem;
    font-weight: 900;
  }
  
  .type {
    color: ${theme.colors.text};
    font-size: 1.5rem;
    text-shadow: 0 0 15px ${theme.colors.primaryLight};
  }
  
  p {
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.colors.text};

    strong {
      color: ${theme.colors.accent};
      
    }
  }
`;

export const ModalContent = styled.div`
  background-color: var(--primary-dark);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  @media (max-width: 700px) {
    max-width: 96vw;
    padding: 1.2rem 0.5rem;
  }
  @media (max-width: 500px) {
    max-width: 99vw;
    padding: 0.7rem 0.2rem;
    font-size: 0.96rem;
  }


  input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
    width: 100%;
    padding: 0.8rem 1.2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    background-color: rgba(0, 12, 36, 0.5);
    color: white;
    font-size: 0.95rem;
    transition: var(--transition);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    appearance: none;
    font-family: var(--font-sans);
}

/* Foco e hover */
input:not([type="checkbox"]):not([type="radio"]):hover,
select:hover,
textarea:hover {
    border-color: rgba(255, 255, 255, 0.2);
}

input:not([type="checkbox"]):not([type="radio"]):focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(86, 180, 89, 0.25);
    background-color: rgba(0, 12, 36, 0.7);
}

/* Estilização personalizada para selects */
select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    padding-right: 2.5rem;
}

/* Estilização para inputs de data e hora */
input[type="date"],
input[type="time"],
input[type="datetime-local"] {
    padding-right: 1.2rem;
}

/* Estilização para inputs desabilitados */
input:disabled,
select:disabled,
textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: rgba(0, 12, 36, 0.3);
}

/* Estilos para placeholders */
::placeholder {
    color: rgba(255, 255, 255, 0.5);
    opacity: 1; /* Necessário para Firefox */
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: rgba(255, 255, 255, 0.5);
}

::-moz-placeholder { /* Firefox 19+ */
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
}

:-ms-input-placeholder { /* IE 10+ */
    color: rgba(255, 255, 255, 0.5);
}

:-moz-placeholder { /* Firefox 18- */
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
}

/* Estilização para autopreenchimento */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(0, 12, 36, 0.8) inset !important;
    -webkit-text-fill-color: white !important;
    caret-color: white;
    border: 1px solid var(--accent-color);
}

/* Estilização para checkboxes e radios */
input[type="checkbox"],
input[type="radio"] {
    width: auto;
    margin-right: 0.5rem;
    transform: scale(1.2);
    accent-color: var(--accent-color);
}

/* Agrupamento de checkboxes/radios */
.checkbox-group,
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.checkbox-group label,
.radio-group label {
    display: flex;
    align-items: center;
    font-weight: normal;
    cursor: pointer;
    margin-bottom: 0;
}

  .filter-group {
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;    
    background: rgba(0, 12, 36, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.25rem;
    backdrop-filter: blur(8px);
}
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
    font-size: 1.5rem;
  }

  .btn {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 500px) {
      padding: 0.5rem 0.7rem;
      font-size: 0.95rem;
    }
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: var(--accent-light);
  }

  .btn-secondary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.7rem 1.4rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 500px) {
      padding: 0.5rem 0.7rem;
      font-size: 0.95rem;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

export const CloseButton = styled.button`
  font-size: 1.75rem;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;
