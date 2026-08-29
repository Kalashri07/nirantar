import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './context/AppContext.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA Service Worker with automatic update activation
registerSW({
  immediate: true,
  onNeedRefresh() {
    // Automatically activate new service worker when updated
  },
  onOfflineReady() {
    console.log('Nirantar is ready for offline learning!');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
