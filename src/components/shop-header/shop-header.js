import React from 'react';
import { connect } from 'react-redux';
import './shop-header.css';

const ShopHeader = ({ count, total }) => {

  return (
    <header className="shop-header row">
        <div className="logo text-dark">ReStore</div>
        <div className="shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {count} items (${total})
        </div>
    </header>
  );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {
  return {
    count: cartItems.reduce( ((count, item) => count + item.count), 0),
    total: orderTotal,
  };
};

export default connect(mapStateToProps)(ShopHeader);
