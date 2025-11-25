import ReactDOM from 'react-dom/client';
import App from '../App';
import { BusquedaProvider } from './context/busquedaContexto';
import { AuthProvider } from './context/authProviderContexto';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BusquedaProvider>
      <App />
    </BusquedaProvider>
  </AuthProvider>
);
