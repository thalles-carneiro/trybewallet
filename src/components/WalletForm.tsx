import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  ChangeEvent,
  Expense,
  FormExpense,
  GlobalState,
  SubmitEvent,
} from '../types';
import { addExpense, getCurrencies, updateExpenses } from '../redux/actions';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const initialStateForm: FormExpense = {
  description: '',
  tag: tags[0],
  value: '',
  method: methods[0],
  currency: 'USD',
};

function WalletForm() {
  const dispatch: AppDispatch = useDispatch();
  const {
    expenses,
    currencies,
    editor,
    idToEdit } = useSelector((state: GlobalState) => state.wallet);
  const [form, setForm] = useState(initialStateForm);

  const isBtnEnabled = false;

  const handleChange = (event: ChangeEvent) => {
    const { target: { name, value } } = event;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (editor) {
      const newExpenses = expenses.map((expense) => {
        if (expense.id === idToEdit) {
          return {
            ...expense,
            ...form,
          };
        }
        return expense;
      });
      dispatch(updateExpenses(newExpenses));
    } else {
      dispatch(addExpense(form));
    }
    setForm(initialStateForm);
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    if (editor) {
      const { description, tag, value,
        method, currency } = expenses.find(({ id }) => id === idToEdit) as Expense;
      setForm({
        description,
        tag,
        value,
        method,
        currency,
      });
    }
  }, [editor]);

  return (
    <form onSubmit={ handleSubmit }>
      <section>
        <label htmlFor="description-input">Descrição da despesa</label>
        <input
          type="text"
          name="description"
          id="description-input"
          value={ form.description }
          onChange={ handleChange }
          data-testid="description-input"
        />

        <label htmlFor="tag-input">Categoria da despesa</label>
        <select
          name="tag"
          id="tag-input"
          value={ form.tag }
          onChange={ handleChange }
          data-testid="tag-input"
        >
          {
            tags
              .map((tag) => <option key={ tag }>{ tag }</option>)
          }
        </select>
      </section>

      <section>
        <label htmlFor="value-input">Valor</label>
        <input
          type="number"
          name="value"
          id="value-input"
          value={ form.value }
          onChange={ handleChange }
          data-testid="value-input"
        />

        <label htmlFor="method-input">Método de pagamento</label>
        <select
          name="method"
          id="method-input"
          value={ form.method }
          onChange={ handleChange }
          data-testid="method-input"
        >
          {
            methods
              .map((method) => <option key={ method }>{ method }</option>)
          }
        </select>

        <label htmlFor="currency-input">Moeda</label>
        <select
          name="currency"
          id="currency-input"
          value={ form.currency }
          onChange={ handleChange }
          data-testid="currency-input"
        >
          {
            currencies
              .map((currency) => <option key={ currency }>{ currency }</option>)
          }
        </select>
      </section>
      <button
        type="submit"
        disabled={ isBtnEnabled }
      >
        { editor ? 'Editar despesa' : 'Adicionar despesa' }
      </button>
    </form>
  );
}

export default WalletForm;
