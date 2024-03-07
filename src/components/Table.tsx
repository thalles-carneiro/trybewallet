import { useSelector } from 'react-redux';
import { GlobalState } from '../types';
import ExpenseCell from './ExpenseCell';

const tableHeadingList = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

function Table() {
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          {
            tableHeadingList
              .map((th) => <th key={ th }>{ th }</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          expenses
            .map((expense) => (
              <ExpenseCell key={ expense.id } expense={ expense } />
            ))
        }
      </tbody>
    </table>
  );
}

export default Table;
