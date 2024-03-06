import styled from 'styled-components';

const MainLogin = styled.main`
  background-color: var(--green);
  background-image: url(src/assets/background.svg);
  background-position: 50% 50%;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  section {
    align-items: center;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    min-height: 50%;
    max-height: 60%;
    padding: 5rem;
    margin: 0 auto;
    min-width: 50%;
    max-width: 60%;
    
    img {
      max-width: 70%;
    }

    form {
      align-items: center;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      input {
        border: 1px solid var(--blue);
        border-radius: 5px;
        color: var(--blue);
        height: 2.5rem;
        font-size: 1rem;
        font-weight: 400;
        padding: 1rem;
        width: inherit;
      }
      input::placeholder {
        color: var(--blue);
        opacity: 0.5;
      }
      button {
        background-color: var(--blue);
        border: 1px solid var(--blue);
        border-radius: 5px;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 700;
        padding: 1rem;
        width: inherit;
      }
      button:disabled {
        background-color: var(--blue);
        opacity: 0.6;
      }
    }
  }
`;

export default MainLogin;
