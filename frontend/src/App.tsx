import logo from './logo.svg';
import './App.css';
import { CelestialReact } from './components/CelestialForeign';
import { useState } from 'react';

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

function App() {

  const [state, setstate] = useState("#fff")
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <Router>
            <AppNavBar />
            <Switch>
              <Route exact path="/">
                <MapClientPage />

              </Route>
              <Route exact path="/ui/">
                <UIKitPage />
              </Route>
              <Route exact path="/editor/">
                <MapEditorPage />
              </Route>

            </Switch>

          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>

  );
}

export default App;
