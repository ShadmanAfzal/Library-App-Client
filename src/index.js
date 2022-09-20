import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AddBook } from './components/Books/AddBook';
import { EditBook } from './components/Books/EditBook';
import { SearchBooks } from './components/Books/SearchBooks';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/add' element={<AddBook />} />
      <Route path='/edit/:id' exact element={<EditBook />} />
      <Route path='/search' element={<SearchBooks />} />
    </Routes>
  </Router>
);