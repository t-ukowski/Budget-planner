import './styles/main.scss';
import Sidebar from './components/sidebar/Sidebar';
import Balance from './components/scoreboards/Balance';
import Title from './components/page/Title';
import Page from './components/page/Page';
import { Element, Link } from 'react-scroll';
import MainChartPage from './components/charts/MainChartPage';
import Table from './components/table/BalanceTable';
import { BalanceData } from './components/table/BalanceData';
import { GoalsData } from './components/table/GoalsData';
import BalancePieChart from './components/charts/BalancePieChart';
import GoalsTable from './components/table/GoalsTable';

function App() {
  return (
    <div className="app">
      <aside>
        <Sidebar />
      </aside>
      <main id="main">
        <Element id="home"></Element>
        <Page>
          <Title text="Budget planner" />
          <Balance />
        </Page>
        <Element id="account"></Element>
        <Page>
          <Title text="Saldo" />
          <Table balanceData={BalanceData} />
          <BalancePieChart balanceData={BalanceData} />
        </Page>
        <Element id="cashflow"></Element>
        <Page>
          <MainChartPage></MainChartPage>
        </Page>
        <Element id="objectives"></Element>
        <Page>
          <Title text="Cele" />
          <GoalsTable goalsData={GoalsData}></GoalsTable>
        </Page>
        <Element id="settings"></Element>
        <Page>
          <Title text="Ustawienia" />
        </Page>
        <Link to="objectives" containerId="main" smooth={true} duration={500}>
          objectives
        </Link>
      </main>
    </div>
  );
}

export default App;
