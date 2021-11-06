import logo from './logo.svg';
import './App.css';
import "@fontsource/roboto";
import { CelestialReact } from './components/CelestialForeign';
import { useEffect, useState } from 'react';

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

function App() {

  const [state, setstate] = useState("#fff")

  const [isPrint, setIsPrint] = useState(false);

  


  const AppBar = <AppNavBar />;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <Router>

            <Switch>
              <Route exact path="/">
                {AppBar}
                <MapClientPage />
              </Route>
              <Route exact path="/ui/">
                {AppBar}
                <UIKitPage />
              </Route>
              <Route exact path="/editor/">
                {AppBar}
                <MapEditorPage />
              </Route>
              <Route exact path="/render/">
                <RenderPage />
              </Route>
              <Route path="/demo/:width/:height/:theme/">
                <Demo />
              </Route>
            </Switch>
          </Router>
        </div>
        <ToastContainer />
      </LocalizationProvider>
    </ThemeProvider>

  );
}

export default App;
