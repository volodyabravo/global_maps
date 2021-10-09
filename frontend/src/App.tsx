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



function App() {

  const [state, setstate] = useState("#fff")
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <AppNavBar />
          <Switch>
            <Route exact path="/">
              <MapEditorPage />
            </Route>
          </Switch>

        </Router>
      </div>
    </ThemeProvider>

  );
}

export default App;
