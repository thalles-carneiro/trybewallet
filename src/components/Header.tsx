import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import coinsIcon from '../assets/coins-icon.svg';
import emailIcon from '../assets/email-icon.svg';
import { GlobalState } from '../types';

function Header() {
  const email = useSelector((state: GlobalState) => state.user.email);
  const expenses = useSelector((state: GlobalState) => state.wallet.expenses);

  const totalExpenses = expenses
    .reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      const { ask } = exchangeRates[currency];
      const expenseActualValue = +value * +ask;
      return acc + expenseActualValue;
    }, 0)
    .toFixed(2);

  return (
    <header>
      <img src={ logo } alt="TrybeWallet" />
      <div>
        <img src={ coinsIcon } alt="Coins icon" />
        <p>
          Total de despesas:
          {' '}
          <span
            data-testid="total-field"
          >
            { totalExpenses }
          </span>
          {' '}
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </p>
      </div>
      <div>
        <img src={ emailIcon } alt="Profile icon" />
        <p
          data-testid="email-field"
        >
          { email }
        </p>
      </div>
    </header>
  );
}

export default Header;
