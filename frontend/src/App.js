import './styles/main.scss';
import Sidebar from './components/Sidebar';
import Balance from './components/scoreboards/Balance';
import Title from './components/Title';

function App() {
  return (
    <div className="app">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Title text="Budget planner" />
        <Balance />
      </main>
    </div>
  );
}

export default App;
