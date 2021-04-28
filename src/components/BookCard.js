import React, { useState } from 'react';
import {
  Button,
  Card,
  CardText,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteBook } from '../helpers/data/bookData';
import BookForm from './BookForm';

const BookCard = ({
  firebaseKey,
  title,
  price,
  author,
  setBooks
}) => {
  const [editing, setEditing] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteBook(firebaseKey)
          .then((bookArray) => setBooks(bookArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Card body>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>Price: {price}</CardText>
      <CardText>Author: {author}</CardText>
      <Button color="danger" onClick={() => handleClick('delete')}>Delete Book</Button>
      <Button color="info" onClick={() => handleClick('edit')}>
        {editing ? 'Close Form' : 'Edit Book'}
      </Button>
      {
      editing && <BookForm
      formTitle='Edit Book'
      setBooks={setBooks}
      firebaseKey={firebaseKey}
      title={title}
      price={price}
      author={author}
      />}
      </Card>
  );
};

BookCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  setBooks: PropTypes.func
};

export default BookCard;
