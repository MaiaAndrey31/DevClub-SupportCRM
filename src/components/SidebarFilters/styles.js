import styled from 'styled-components';

export const Sidebar = styled.aside`
  width: 280px;
  background-color: #49167C;
  border-right: 1px solid var(--border-color);
  padding: 1.5rem;
  overflow-y: auto;
  transition: width 0.3s, left 0.3s;
  @media (max-width: 900px) {
    width: 180px;
    padding: 1rem 0.5rem;
  }
  @media (max-width: 700px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
    z-index: 1100;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0.2rem;
  }
`;

export const FilterSection = styled.div`
display: flex;
flex-direction: column;
gap: 1.2rem;


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
    display: inline-flex
;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
