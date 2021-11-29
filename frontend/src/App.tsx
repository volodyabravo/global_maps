import './App.css';
import "@fontsource/roboto";
import "@fontsource/montserrat";

import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AppNavBar from './components/AppBar';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import { MapEditorPage } from './pages/MapEditor';
import { UIKitPage } from './pages/UIKit';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StarClient from './pages/clients/StarClient';
import StreetClient from './pages/clients/StreetClient';
import VectorClient from './pages/clients/VectorClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RenderPage } from './pages/Render';
import { Demo } from './pages/Demo';
import CartPage from './pages/Cart';


import cartStore from './cart/cart.store';
import productsStore from './cart/products.store';
import MainPage from './pages/Main';
import AboutPage from './pages/About';
import DeliveryPage from './pages/Delivery';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Provider {...{ cartStore, productsStore }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Switch>
              <Route exact path="/">
                <AppNavBar />
                <MainPage />
              </Route>
              <Route exact path="/star/">
                <AppNavBar />
                <StarClient />
              </Route>
              <Route exact path="/street/">
                <AppNavBar />
                <StreetClient />
              </Route>
              <Route exact path="/vector/">
                <AppNavBar />
                <VectorClient />
              </Route>
              
              <Route exact path="/about/">
                <AppNavBar />
                <AboutPage />
              </Route>
              <Route exact path="/delivery/">
                <AppNavBar />
                <DeliveryPage />
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
