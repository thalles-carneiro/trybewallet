import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

function Wallet() {
  return (
    <main>
      <section>
        <Header />
        <WalletForm />
      </section>
      <Table />
    </main>
  );
}

export default Wallet;
