import React from 'react';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from 'react-router-dom';
import 'setimmediate';
import BurnsPage from './pages/BurnsPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Specify Inter as the primary font family
  },
  overrides: {
    // You can further customize specific components' typography if needed
    // For example, if you want to use a different variant of Inter for the button text:
    MuiButton: {
      root: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
    },
  },
});
// Here everything comes together into one piece
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
  },
  {
    path: '/burns',
    element: <BurnsPage/>,
  },
]);
/**
 * @return {JSX.Element}
 * @constructor
 */
export default function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <RouterProvider router={router}>
        <Navbar/>
        <div style={{paddingTop: '130px'}}> {/* add some padding */}
          <MainPage/>
        </div>
      </RouterProvider>
      </ThemeProvider>
    </>
  );
}

