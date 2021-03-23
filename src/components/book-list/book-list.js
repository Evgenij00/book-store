import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc/with-bookstore-service';
import { booksLoaded, booksRequested, booksError, bookAddedToCart } from '../../actions';

import BookListItem from '../book-list-item/book-list-item';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)}/>
            </li>
          );
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;

    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((err) => booksError(err));
  }

  render() {
    const { books, loading, error, bookAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={bookAddedToCart}/>;
  }
}

const mapStateToProps = ({ bookList: { books, loading, error }}) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError,
  bookAddedToCart,
};

export default 
  withBookstoreService()(
    connect(mapStateToProps, mapDispatchToProps)(BookListContainer)
  )
