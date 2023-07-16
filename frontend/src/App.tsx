
import "@fontsource/roboto";
import "@fontsource/montserrat";

import { Provider } from 'mobx-react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import { UIKitPage } from './pages/UIKit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import cartStore from './cart/cart.store';
import productsStore from './cart/products.store';
import MainPage from './pages/Main';
import StarClient from './pages/clients/StarClient';
import VectorClient from './pages/clients/VectorClient';
import AboutPage from './pages/About';
import DeliveryPage from './pages/Delivery';
import { MapEditorPage } from './pages/MapEditor';
import { RenderPage } from './pages/Render';
import { Demo } from './pages/Demo';
import Cart from './pages/Cart';
import { OrderPage } from './pages/OrderPage';
import StreetClient from './pages/clients/StreetClient';


function App() {
  return (

    <ThemeProvider theme={theme}>
      <Provider {...{ cartStore, productsStore }}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ui/" element={<UIKitPage />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/order/:id/" element={<OrderPage />} />
            <Route path="/star/" element={<StarClient />} />
            <Route path="/editor/" element={<MapEditorPage />} />
            <Route path="/street/" element={<StreetClient />} />
            <Route path="/delivery/" element={<DeliveryPage />} />
            <Route path="/render/" element={<RenderPage />} />
            <Route path="/demo/:width/:height/:theme/" element={<Demo />} />
            
            <Route path="/order/:id/" element={<OrderPage />} /> 
            <Route path="/vector/" element={<VectorClient />} />
            <Route path="/about/" element={<AboutPage />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </ThemeProvider>

  );
}

export default App;
