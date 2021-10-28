import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import classes from './App.module.scss';
import Navigation from './components/layout/Navigation/Navigation';
import { Switch, Route } from 'react-router';

function App() {
  return (
    <div className={classes.App}>
      <Navigation className={classes.App__navigation}></Navigation>
      <Switch>
        <Route path="/registration" exact component={Registration}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
    </div>
  );
}

export default App;
