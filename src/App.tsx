import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Products from './components/products'; // Capitalized component name
import SingleProduct from './components/single-product'; // Capitalized component name

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />  
        
        <Route path="/single-product" element={<SingleProduct />} />
        <Route index element={<Products />} /> 
        
      </Routes>
    </Router>
  );
};

export default App;

