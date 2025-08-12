import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import {store} from "./store/store"

createRoot(document.getElementById("root")!).render(
<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
