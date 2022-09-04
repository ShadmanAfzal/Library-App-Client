import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddBook } from './components/books/AddBook';
import { EditBook } from './components/books/EditBook';
import { SearchBooks } from './components/books/SearchBooks';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/add' element={<AddBook />} />
          <Route path='/edit' element={<EditBook />} />
          <Route path='/search' element={<SearchBooks />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);