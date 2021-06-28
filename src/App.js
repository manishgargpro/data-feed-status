// import logo from './logo.svg';
import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import './App.css';
import { CssBaseline } from '@material-ui/core';
import MainPage from './components/MainPage'

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  //change above to 'dark' in production

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage darkMode={prefersDarkMode} />
    </ThemeProvider>
  );
}

export default App;
