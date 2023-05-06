import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AntdChart } from './components/AntdChart';
import { Navbar } from './components/Navbar';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='chart' element={<AntdChart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
