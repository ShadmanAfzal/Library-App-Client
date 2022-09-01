import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AddBook } from './components/AddBook';
import { AppBar } from './components/Appbar';
import { EditBook } from './components/EditBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/add' element={<AddBook />} />
          <Route path='/edit' element={<EditBook />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);