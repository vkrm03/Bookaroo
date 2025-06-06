import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Slide, Bounce, Zoom, Flip } from 'react-toastify';
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';  
import '../assets/Books.css';

export default function Books({ addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

  useEffect(() => {
          AOS.init({ duration: 800, once: true });
      }, []);

  const categoryMap = {
    All: 'fiction',
    Romance: 'romance',
    Mystery: 'mystery',
    'Sci-Fi': 'science_fiction',
    Horror: 'horror',
    Fantasy: 'fantasy',
    History: 'history',
    Biography: 'biography',
    Kids: 'children',
  };

  const fetchBooks = async () => {
  setLoading(true);
  setBooks([]);
  try {
    let url = '';
    const STANDARD_PRICES = [150, 200, 350, 400, 500];
    const getPriceForBook = (title) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % STANDARD_PRICES.length;
  return STANDARD_PRICES[index];
};

    if (showSearchResult && searchQuery.trim() !== '') {
      url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=40`;
      const res = await fetch(url);
      const data = await res.json();

      const booksData = data.items?.map((book) => ({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
        cover_id: book.volumeInfo.imageLinks?.thumbnail || null,
        price: getPriceForBook(book.volumeInfo.title),
      })) || [];
      setBooks(booksData);
    } else {
      const subject = categoryMap[selectedCategory] || 'fiction';
      url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(subject)}&maxResults=40`;
      const res = await fetch(url);
      const data = await res.json();

      const booksData = data.items?.map((book) => ({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
        cover_id: book.volumeInfo.imageLinks?.thumbnail || null,
        price: getPriceForBook(book.volumeInfo.title),
      })) || [];
      setBooks(booksData);
    }
  } catch (error) {
    console.error('Failed to fetch books:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, showSearchResult]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setShowSearchResult(true);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setShowSearchResult(false);
  };

  return (
    <div className="books-container">
      <h1 className="title">Explore Books</h1>

     <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch();
  }}
  className="search-bar"
>
  <input
    type="text"
    placeholder="Search books by title, author, or genre..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" className="search-btn">
    Search
  </button>
</form>


      <div className="category-tabs" data-aos="zoom-out">
        {Object.keys(categoryMap).map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      
      {loading ? (
  <div className="loader-container">
  <div className="loader"></div>
  <p>Loading books...</p>
</div>

) : books.length > 0 ? (
  <>
    {showSearchResult && searchQuery !== '' && (
      <p className="search-result-text">
        Showing search results for: <strong>{searchQuery}</strong>
      </p>
    )}
    <div className="book-list" data-aos="fade-up">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
  <img
    src={ book.cover_id ? book.cover_id : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMI5yf9vYw85Q9Qr4kI3HH-qHdza7Gzp5HQ&s'}
    alt={book.title}
  />
  <p><strong>{book.title}</strong></p>
  <p>by {book.author}</p>
  <p className="price">₹{book.price}</p>
  <button
  className="add-btn"
  onClick={() => {
    addToCart(book);
    toast.success(`Book Added to your bag !`, {
      position: 'top-center',
      autoClose: 800,
      hideProgressBar: true,
      transition: Slide,
      pauseOnHover: false,
      draggable: false,
    });
  }}
>
  Add to Bag
</button>


</div>

      ))}
    </div>
  </>
) : (
  <p>No books found.</p>
)}


<ToastContainer />
    </div>
  );
}
