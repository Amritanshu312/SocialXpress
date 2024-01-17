import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { BrowserRouter } from "react-router-dom";
import ScreenLoadingState from './contexts/screen_Loading.jsx';
import IsAddPostState from './contexts/IsAddPost';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScreenLoadingState>

        <IsAddPostState>
          <App />
        </IsAddPostState>

      </ScreenLoadingState>
    </BrowserRouter>
  </React.StrictMode>,
)
