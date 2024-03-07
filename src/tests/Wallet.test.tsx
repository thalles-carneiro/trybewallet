import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import * as fetchWallet from '../services/fetchWallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const userEmail = 'user@email.com';
const initialStateMock = {
  user: {
    email: userEmail,
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('Testa a página <Wallet />', () => {
  it('renderiza corretamente o componente <Header />', () => {
    vi.spyOn(fetchWallet, 'fetchExchangeRates')
      .mockResolvedValueOnce(Object.keys(mockData));

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: initialStateMock,
      },
    );

    const logo = screen.getByAltText('TrybeWallet');
    const totalField = screen.getByTestId('total-field');
    const emailField = screen.getByTestId('email-field');

    expect(logo).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0.00');
    expect(emailField).toHaveTextContent(userEmail);
  });

  it('renderiza corretamente o componente <WalletForm />', async () => {
    vi.spyOn(fetchWallet, 'fetchExchangeRates')
      .mockResolvedValueOnce(Object.keys(mockData));

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: initialStateMock,
      },
    );

    const descriptionInput = screen.getByLabelText('Descrição da despesa');
    const tagInput = screen.getByLabelText('Categoria da despesa');
    const valueInput = screen.getByTestId('value-input');
    const methodInput = screen.getByLabelText('Método de pagamento');
    const currencyInput = await screen.findByText('USD', { selector: 'option' });
    const addExpenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(1);
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledWith('currencies');

    expect(descriptionInput).toHaveTextContent('');
    expect(tagInput).toHaveTextContent('Alimentação');
    expect(valueInput).toHaveTextContent('');
    expect(methodInput).toHaveTextContent('Dinheiro');
    expect(currencyInput).toHaveTextContent('USD');
    expect(addExpenseBtn).toBeInTheDocument();
  });

  it('permite adicionar uma despesa e renderizá-la no componente <Table />', async () => {
    vi.spyOn(fetchWallet, 'fetchExchangeRates')
      .mockResolvedValueOnce(Object.keys(mockData))
      .mockResolvedValueOnce(mockData);

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: initialStateMock,
      },
    );

    const descriptionInput = screen.getByLabelText('Descrição da despesa');
    const tagInput = screen.getByLabelText('Categoria da despesa');
    const valueInput = screen.getByTestId('value-input');
    const methodInput = screen.getByLabelText('Método de pagamento');
    const currencyInput = screen.getByTestId('currency-input');
    const addExpenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(1);
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledWith('currencies');

    await userEvent.type(descriptionInput, 'Onze dólares');
    await userEvent.selectOptions(tagInput, 'Lazer');
    await userEvent.type(valueInput, '11');
    await userEvent.selectOptions(methodInput, 'Cartão de crédito');
    await userEvent.selectOptions(currencyInput, 'USD');
    await userEvent.click(addExpenseBtn);

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(2);
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledWith();

    expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(screen.getByRole('cell', { name: 'Onze dólares' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Lazer' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '11.00' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Cartão de crédito' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '4.75' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '52.28' })).toBeInTheDocument();
    expect(screen.getByTestId('edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
  });

  it('permite remover uma despesa', async () => {
    vi.spyOn(fetchWallet, 'fetchExchangeRates')
      .mockResolvedValueOnce(Object.keys(mockData))
      .mockResolvedValueOnce(mockData);

    renderWithRouterAndRedux(
      <App />,
      {
        initialEntries: ['/carteira'],
        initialState: initialStateMock,
      },
    );

    const descriptionInput = screen.getByLabelText('Descrição da despesa');
    const tagInput = screen.getByLabelText('Categoria da despesa');
    const valueInput = screen.getByTestId('value-input');
    const methodInput = screen.getByLabelText('Método de pagamento');
    const currencyInput = screen.getByTestId('currency-input');
    const addExpenseBtn = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(1);
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledWith('currencies');
    expect(screen.getAllByRole('row')).toHaveLength(1);

    await userEvent.type(descriptionInput, 'Onze dólares');
    await userEvent.selectOptions(tagInput, 'Lazer');
    await userEvent.type(valueInput, '11');
    await userEvent.selectOptions(methodInput, 'Cartão de crédito');
    await userEvent.selectOptions(currencyInput, 'USD');
    await userEvent.click(addExpenseBtn);

    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledTimes(2);
    expect(fetchWallet.fetchExchangeRates).toHaveBeenCalledWith();
    expect(await screen.findAllByRole('row')).toHaveLength(2);

    const deleteExpenseBtn = screen.getByTestId('delete-btn');
    await userEvent.click(deleteExpenseBtn);
    expect(await screen.findAllByRole('row')).toHaveLength(1);
  });
});
