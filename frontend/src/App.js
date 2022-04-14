import './styles/main.scss';
import Sidebar from './components/sidebar/Sidebar';
import Balance from './components/scoreboards/Balance';
import Title from './components/page/Title';
import Page from './components/page/Page';
import { Element, Link } from 'react-scroll';

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
        </Page>
        <Element id="cashflow"></Element>
        <Page>
          <Title text="Przewidywania stanu konta" />
        </Page>
        <Element id="objectives"></Element>
        <Page>
          <Title text="Cele" />
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
