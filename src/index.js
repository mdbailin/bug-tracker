import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <DarkModeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
    </DarkModeContextProvider>
);
