import ReactDOM from 'react-dom/client';
import App from '../App';
import { BusquedaProvider } from './context/busquedaContexto';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BusquedaProvider>
    <App />
  </BusquedaProvider>
);
