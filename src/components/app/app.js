import React from 'react';
import BookList from '../book-list';
import ShopHeader from '../shop-header';
import ShoppingCartTable from '../shopping-cart-table';

import './app.css';

const App = () => {
  return (
    <div className="container">
      <ShopHeader/>
      <div>
        <BookList />
        <ShoppingCartTable />
      </div>
    </div>
  );
};

export default App;
