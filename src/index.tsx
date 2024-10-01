import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import PortalProvider from '@cobalt/react-portal-provider';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import theme from '@cobalt/theme-light';

import App from './App';
import store from './store';

import './index.scss';

ReactDOM.render(
  <ThemeProvider loader={() => Promise.resolve(theme)}>
    <PortalProvider>
      <ViewportProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ViewportProvider>
    </PortalProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
