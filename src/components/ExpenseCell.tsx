import { useDispatch, useSelector } from 'react-redux';
import { editExpense, updateExpenses } from '../redux/actions';
import trashCanIcon from '../assets/trashCanIcon.svg';
import editIcon from '../assets/editIcon.svg';
import { Expense, GlobalState } from '../types';

type ExpenseProps = {
  expense: Expense,
};

function ExpenseCell({ expense }: ExpenseProps) {
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);
  const dispatch = useDispatch();

  const { id, description, tag, method, value, currency, exchangeRates } = expense;
  const convertedValue = (+exchangeRates[currency].ask * +value).toFixed(2);
  const exchangeRateValue = (+exchangeRates[currency].ask).toFixed(2);

  const handleClickEdit = () => {
    dispatch(editExpense(id, true));
  };

  const handleClickRemove = () => {
    const newExpenses = expenses.filter(({ id: expenseId }) => expenseId !== id);
    dispatch(updateExpenses(newExpenses));
  };

  return (
    <tr key={ id }>
      <td>{ description }</td>
      <td>{ tag }</td>
      <td>{ method }</td>
      <td>{ (+value).toFixed(2) }</td>
      <td>{ exchangeRates[currency].name }</td>
      <td>{ exchangeRateValue }</td>
      <td>{ convertedValue }</td>
      <td>Real</td>
      <td>
        <button
          type="button"
          onClick={ handleClickEdit }
          data-testid="edit-btn"
        >
          <img
            src={ editIcon }
            alt="Edit icon"
          />
        </button>
        <button
          type="button"
          onClick={ handleClickRemove }
          data-testid="delete-btn"
        >
          <img
            src={ trashCanIcon }
            alt="Trash can icon"
          />
        </button>
      </td>
    </tr>
  );
}

export default ExpenseCell;
