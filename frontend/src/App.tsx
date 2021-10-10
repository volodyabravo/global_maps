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
import { ThemeProvider } from '.pnpm/@emotion+react@11.4.1_b094b78811fc8d2f00a90f13d0251fb6/node_modules/@emotion/react';
import theme from './theme/theme';
import { MapEditorPage } from './pages/MapEditor';
import { UIKitPage } from './pages/UIKit';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

function App() {

  const [state, setstate] = useState("#fff")
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider  dateAdapter={AdapterDateFns}>
        <div className="App">
          <Router>
            <AppNavBar />
            <Switch>
              <Route exact path="/">
                <MapEditorPage />
              </Route>
              <Route exact path="/ui/">
                <UIKitPage />
              </Route>

            </Switch>

          </Router>
        </div>
      </LocalizationProvider>
    </ThemeProvider>

  );
}

export default App;
