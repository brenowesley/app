// src/main.jsx - Apenas inicialização e provedores
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // <--- IMPORTA O COMPONENTE PRINCIPAL
import './index.css'; // Seu CSS e Tailwind

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);