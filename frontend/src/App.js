import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Drinks from './components/Drinks';
import LandingPage from './components/LandingPage';
import DrinkDetails from './components/DrinkDetails';
import DrinkForm from './components/DrinkForm';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/drinks">
          <Drinks />
        </Route>
        <Route path="/drinks/:drinkId(\\d+)">
          <DrinkDetails />
        </Route>
        <Route path="/drinks/new">
          <DrinkForm />
        </Route>
        <Route>
          <h2>Page Not Found</h2>
        </Route>
      </Switch>
    </>
  );
}

export default App;
