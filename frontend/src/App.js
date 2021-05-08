import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import Navigation from './components/Navigation';
import Drinks from './components/Drinks';
import LandingPage from './components/LandingPage';
import DrinkDetails from './components/DrinkDetails';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.navDiv}>
        <Navigation isLoaded={isLoaded} />
      </div>
      <div className={styles.routesDiv}>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/drinks">
            <Drinks />
          </Route>
          <Route path="/drinks/:drinkId(\d+)">
            <DrinkDetails />
          </Route>
          <Route path="/users/:userId">
            <ProfilePage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route>
            <h2>Page Not Found</h2>
          </Route>
        </Switch>
      </div>
      <div className={styles.footerDiv}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
