import './styles/main.scss';
import Sidebar from './components/sidebar/Sidebar';
import Balance from './components/scoreboards/Balance';
import Title from './components/page/Title';
import Page from './components/page/Page';

function App() {
  return (
    <div className="app">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Page>
          <Title text="Budget planner" />
          <Balance />
        </Page>
        <Page>
          <Title text="Saldo" />
        </Page>
        <Page>
          <Title text="Przewidywania stanu konta" />
        </Page>
        <Page>
          <Title text="Cele" />
        </Page>
        <Page>
          <Title text="Ustawienia" />
        </Page>
      </main>
    </div>
  );
}

export default App;
