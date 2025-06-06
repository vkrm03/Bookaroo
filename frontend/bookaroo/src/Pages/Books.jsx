import React, { useState, useEffect } from 'react';
import '../assets/Books.css';

export default function Books({ addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);

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
      if (showSearchResult && searchQuery.trim() !== '') {
        url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=50`;
        const res = await fetch(url);
        const data = await res.json();

        const booksData = data.docs.map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          cover_id: book.cover_i,
        }));
        setBooks(booksData);
      } else {
        const subject = categoryMap[selectedCategory] || 'fiction';
        url = `https://openlibrary.org/subjects/${subject}.json?limit=40`;
        const res = await fetch(url);
        const data = await res.json();

        const booksData = data.works.map((book) => ({
          title: book.title,
          author: book.authors?.[0]?.name || 'Unknown Author',
          cover_id: book.cover_id,
        }));
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
    e.preventDefault(); // prevents page reload
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


      <div className="category-tabs">
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
    <div className="book-list">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
  <img
    src={
      book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMI5yf9vYw85Q9Qr4kI3HH-qHdza7Gzp5HQ&s'
    }
    alt={book.title}
  />
  <p><strong>{book.title}</strong></p>
  <p>by {book.author}</p>

  <button
    className="add-btn"
    onClick={() => addToCart(book)}
  >
    🛒 Add to Bag
  </button>
</div>

      ))}
    </div>
  </>
) : (
  <p>No books found.</p>
)}



    </div>
  );
}
