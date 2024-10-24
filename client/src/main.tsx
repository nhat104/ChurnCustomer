import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { store } from './store';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
