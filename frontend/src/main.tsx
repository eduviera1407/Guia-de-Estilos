
import ReactDOM from 'react-dom/client'; 
import App from './App';
import CssBaseline from '@mui/material/CssBaseline'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/styles'; 
//Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux';
//Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Renderizar la aplicación
root.render(
  <ThemeProvider theme={theme}> 
    <CssBaseline /> 
    <Provider store={store}>
    <App />
    </Provider>
  </ThemeProvider>
);
