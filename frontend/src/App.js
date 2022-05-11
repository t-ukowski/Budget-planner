import './styles/main.scss';
import Sidebar from './components/sidebar/Sidebar';
import Balance from './components/scoreboards/Balance';
import Title from './components/page/Title';
import Page from './components/page/Page';
import { Element, Link } from 'react-scroll';
import MainChartPage from './components/charts/MainChartPage';
import Goals from './components/goals/Goals';
// import BalancePieChart from './components/charts/BalancePieChart';
import Accounts from './components/accounts/Accounts';

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
          <Accounts />
        </Page>
        <Element id="cashflow"></Element>
        <Page>
          <MainChartPage></MainChartPage>
        </Page>
        <Element id="objectives"></Element>
        <Page classNames="page-long">
          <Goals />
        </Page>
        <Element id="settings"></Element>
        <Page>
          <Title text="Ustawienia" />
        </Page>
        <Link to="objectives" containerId="main" smooth={true} duration={500} />
      </main>
    </div>
  );
}

export default App;
