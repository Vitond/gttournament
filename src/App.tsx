import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
import classes from './App.module.scss';
import Navigation from './components/layout/Navigation/Navigation';
import { Switch, Route } from 'react-router';
import Success from './components/other/Success/Success';
import Documents from './pages/Documents/Documents';
import Sponsors from './pages/Sponsors/Sponsors';
import Contestants from './pages/Contestants/Contestants';
import Footer from './components/layout/Footer/Footer';
import axios from './axios/axios';
import ScrollToTop from './components/other/ScrollToTop/ScrollToTop';
import { Context } from './store/context';
import { useLocation } from 'react-router';
import { useEffect, useContext } from 'react';
import Rules from './pages/Rules/Rules';
import { AnimatePresence } from 'framer-motion';

function App() {
  const context = useContext(Context);
  useEffect(() => {
    axios.get('/schools').then((response) => {
      context.setSchools(response.data.schools);
    })
  }, [])

  const location = useLocation();

  return (
    <div className={classes.App}>
      <Navigation className={classes.App__navigation}></Navigation>
      <AnimatePresence exitBeforeEnter>
        <ScrollToTop></ScrollToTop>
        <Route path="/success" component={Success}></Route>
        <Switch location={location} key={location.key}>
          <Route path="/sponsors" exact component={Sponsors}></Route>
          <Route path="/documents" exact component={Documents}></Route>
          <Route path="/registration" exact component={Registration}></Route>
          <Route path="/contestants" exact component={Contestants}></Route>
          <Route path="/rules" exact component={Rules}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </AnimatePresence>
      <Footer></Footer>
    </div>
  );
}

export default App;
