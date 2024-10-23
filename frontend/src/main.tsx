
import ReactDOM from 'react-dom/client'; 
import App from './App';
import CssBaseline from '@mui/material/CssBaseline'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/styles'; 

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Renderizar la aplicación
root.render(
  <ThemeProvider theme={theme}> 
    <CssBaseline /> 
    <App />
  </ThemeProvider>
);
