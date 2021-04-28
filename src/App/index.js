import React, { useState, useEffect } from 'react';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import './App.scss';
import { getBooks } from '../helpers/data/bookData';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((resp) => setBooks(resp));
  }, []);

  return (
    <>
    <BookForm
      formTitle='Add Book'
      setBooks={setBooks}
      />
      <hr/>
      <div className="card-container">
        {books.map((bookInfo) => (
          <BookCard
            key={bookInfo.firebaseKey}
            firebaseKey={bookInfo.firebaseKey}
            title={bookInfo.title}
            author={bookInfo.author}
            price={Number(bookInfo.grade)}
            setBooks={setBooks}
           />
        ))}
      </div>
    </>
  );
}

export default App;
