import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import * as fetchWallet from '../services/fetchWallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const validEmail = 'teste@email.com';
const invalidEmail = 'teste';
const validPassword = '123456';
const invalidPassword = '12';

describe('Testa a página <Login />', () => {
  it('renderiza corretamente o formulário de login', () => {
    renderWithRouterAndRedux(<App />);

    const logo = screen.getByAltText('TrybeWallet');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    expect(logo).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  it('preencher o formulário com informações incorretas não habilitam o botão', async () => {
    renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');

    await userEvent.type(emailInput, invalidEmail);
    await userEvent.type(passwordInput, validPassword);
    expect(loginBtn).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, invalidPassword);
    expect(loginBtn).toBeDisabled();
  });

  it('preencher o formulário com informações válidas habilitam o botão', async () => {
    vi.spyOn(fetchWallet, 'fetchExchangeRates')
      .mockResolvedValue(Object.keys(mockData));
    const { store } = renderWithRouterAndRedux(<App />);

    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Senha');

    await userEvent.type(emailInput, validEmail);
    await userEvent.type(passwordInput, validPassword);
    expect(loginBtn).toBeEnabled();
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(0);

    await userEvent.click(loginBtn);

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(1);
    expect(store.getState().user.email).toBe(validEmail);
    expect(screen.getByText(validEmail, { selector: 'p' })).toBeInTheDocument();
  });
});
