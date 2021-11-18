import './App.css';
import "@fontsource/roboto";
import "@fontsource/montserrat";

import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppNavBar from './components/AppBar';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import { MapEditorPage } from './pages/MapEditor';
import { UIKitPage } from './pages/UIKit';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { MapClientPage } from './pages/MapClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RenderPage } from './pages/Render';
import { Demo } from './pages/Demo';
import { CartPage } from './pages/Cart';


import cartStore from './cart/cart.store';
import productsStore from './cart/products.store';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Provider {...{ cartStore, productsStore }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Switch>
              <Route exact path="/">
                <AppNavBar />
                <MapClientPage />
              </Route>
              <Route exact path="/ui/">
                <AppNavBar />
                <UIKitPage />
              </Route>
              <Route exact path="/editor/">
                <AppNavBar />
                <MapEditorPage />
              </Route>
              <Route exact path="/render/">
                <RenderPage />
              </Route>
              <Route path="/demo/:width/:height/:theme/">
                <Demo />
              </Route>
              <Route exact path="/cart/">
                <AppNavBar />
                <CartPage />
              </Route>
            </Switch>
          </Router>
          <ToastContainer />
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>

  );
}

export default App;
