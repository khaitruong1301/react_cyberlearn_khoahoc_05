import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
export const history = createBrowserHistory();

function App() {


  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;



