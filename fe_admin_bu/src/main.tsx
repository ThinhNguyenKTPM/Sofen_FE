import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {StyledProvider} from "./app/components/StyledProvider.tsx";
import "./app/i18n";
import {Provider} from "react-redux";
import store from "app/store/store.ts";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <StyledProvider>
              <App />
          </StyledProvider>
      </Provider>
  </React.StrictMode>,
)
