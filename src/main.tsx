import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import AuthPortalsProvider from './context/AuthPortalsProvider.tsx';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import { store } from './app/store.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthPortalsProvider>
        <Provider store={store}>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            transition={Bounce}
          />
        </Provider>
      </AuthPortalsProvider>
    </BrowserRouter>
  </StrictMode>
);
