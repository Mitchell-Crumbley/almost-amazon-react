import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getBooks, updateBook } from '../helpers/data/bookData';

const BookForm = ({
  formTitle,
  setBooks,
  firebaseKey,
  title,
  price,
  author,
  image,
}) => {
  const [book, setBook] = useState({
    title: title || '',
    author: author || '',
    price: price || 0,
    firebaseKey: firebaseKey || null,
    image: image || '',
  });

  const handleInputChange = (e) => {
    setBook((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.firebaseKey) {
    // make call to updateStudent to update student and rerender the DOM
      updateBook(book).then((bookArray) => setBooks(bookArray));
    } else {
    // add a student to firebase
      getBooks(book).then((bookArray) => setBooks(bookArray));
    }
  };

  return (
    <div className='book-form'>
      <Form id='addBookForm' autoComplete='off' onSubmit={handleSubmit}>
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="title">Title:</Label>
          <Input
            name='title'
            id='title'
            value={book.title}
            type='text'
            placeholder='Enter a Book Title'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="teacher">Author:</Label>
          <Input
            name='author'
            id='author'
            value={book.author}
            type='text'
            placeholder='Enter an Author Name'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="teacher">Price:</Label>
          <Input
            name='price'
            id='price'
            value={book.price}
            type='number'
            placeholder='Enter a Price'
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="grade">Picture:</Label>
          <Input
            name='image'
            id='image'
            value={book.image}
            type='text'
            placeholder='Enter an Image URL'
            onChange={handleInputChange}
          />
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

BookForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setBooks: PropTypes.func,
  title: PropTypes.string,
  author: PropTypes.string,
  price: PropTypes.number,
  firebaseKey: PropTypes.string,
  image: PropTypes.string,
};

export default BookForm;
