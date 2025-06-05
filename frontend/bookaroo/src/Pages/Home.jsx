import React, {useState, useEffect} from "react";
import '../assets/Home.css';
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=tsbcjKvvJpkkOwOReD8vdekpXmJxvevh"
        );
        const data = await res.json();
        if (data.status === "OK") {
          setBooks(data.results.books);
        } else {
          console.error("NYT API error", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <>
      <main className="home-container" data-aos="fade-up">
        <section className="hero">
          <div className="text-content">
            <h1><strong>Bookaroo</strong></h1>
            <p>Your next-gen AI-powered bookstore — where stories come alive and your next read awaits.</p>
            <button className="shop-btn" onClick={() => {
  document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}}>Start Exploring</button>
          </div>
          <div className="image-content">
            <img src="/book_img.jpg" alt="Book image" />
          </div>
        </section>

       <section className="features">
  <h2>Why Choose Bookaroo?</h2>
  <div className="feature-cards">
    <div className="feature">
      <h3>Smart Store</h3>
      <p>Our Chat bot AI tracks your vibe and drops best books you’ll enjoy.</p>
    </div>
    <div className="feature">
      <h3>Personalized Bookaroo</h3>
      <p>Bookaroo learns what you love and serves up fresh reads tailored just for you.</p>
    </div>
    <div className="feature">
      <h3>Chatbot AI Assistant</h3>
      <p>Got questions or need book inspo? Chat with our AI assistant 24/7.</p>
    </div>
  </div>
</section>


        <section className="trending" id="trending" data-aos="fade-up">
          <h2>Trending Now</h2>
         <div className="trending-books">
            {books.slice(0, 10).map((book, index) => (
              <div className="book-card" key={index}>
                <img
                  src={book.book_image || "https://via.placeholder.com/150x220.png?text=No+Image"}
                  alt={book.title}
                  style={{ width: "150px", height: "220px", objectFit: "cover", borderRadius: "12px" }}
                />
                <p><strong>{book.title}</strong></p>
                <p>by {book.author}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bookaroo-connect" data-aos="fade-up">
            <div className="connect-left">
                <h3>Become a Bookaroo Insider</h3>
                <p>Be the first to hear about trending reads, AI book drops, reader events, and exclusive merch. It's free. It's fun. It's bookish bliss.</p>
                
                <form>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
                </form>
            </div>

            <div className="connect-right">
                <h3>Join the Club</h3>
                <p>Chat with fellow bookaholics, join weekend reading challenges, and show off your ultimate shelf.</p>
                <button className="join-btn">Join the Community</button>
            </div>
        </section>

        <footer className="footer" data-aos="fade-up">
  <p>© {new Date().getFullYear()} Bookaroo — All rights reserved.</p>
</footer>

        
      </main>
    </>
  );
}
