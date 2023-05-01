import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App';

import { HashRouter } from 'react-router-dom';
import './firebase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
