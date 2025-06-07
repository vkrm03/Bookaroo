import React, { useEffect } from "react"; 
import "../assets/about.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="about-container" data-aos="fade-up">
      <section className="about-hero">
        <h1>About <span>Bookaroo</span></h1>
        <p>Redefining how you discover, love, and talk about books. We’re not just a store, we’re your book bestie.</p>
      </section>

      <section className="about-section" data-aos="fade-up">
        <h2>Our Mission</h2>
        <p>
          Bookaroo isn’t just about selling books — we’re here to help you fall in love with reading all over again. With AI-powered recommendations and a book-loving community, we’re all about that next-gen bookworm life.
        </p>
      </section>

      <section className="about-section" data-aos="fade-up">
        <h2>AI-Powered Chatbot</h2>
        <p>
          Our intelligent chatbot helps you find your next read based on mood, genre, or even your star sign. Personalized book drops? Oh yes.
        </p>
      </section>

      <section className="about-section" data-aos="fade-up">
        <h2>Built by Readers, for Readers</h2>
        <p>
          Created by a small team of book nerds and tech wizards, Bookaroo is a place where stories come alive. Whether you're a midnight reader, self-help junkie, or fantasy adventurer, you belong here.
        </p>
      </section>



        <section className="about-dev-highlight" data-aos="fade-up">
  <div className="dev-card">
    <div className="dev-info">
      <h2>Meet the Developer</h2>
      <p>
        Hi, I’m <strong>Vikram</strong> — an IT Engineering student with a passion for building full-stack applications,
        exploring Artificial Intelligence, and innovating through tech. I love turning bold ideas into real-world solutions using modern web tech and IoT.
      </p>
      <p>
        From MERN stack magic to microcontroller wizardry, I’m all about crafting experiences that blend design, function, and intelligence.
      </p>
      <div className="dev-links">
        <a href="https://github.com/vkrm03" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i> GitHub
        </a>
        <a href="https://linkedin.com/in/vkrma" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="mailto:vikramrokith03@email.com">
          <i className="fas fa-envelope"></i> Email Me
        </a>
      </div>
    </div>
    <div className="dev-img">
      <img src="https://avatars.githubusercontent.com/u/76442734?s=400&u=5627b3fe65189968d17937b1cb48a7852e009e19&v=4" alt="vikram" />
    </div>
  </div>
</section>




      <footer className="about-footer">
        <p>© {new Date().getFullYear()} Bookaroo — All rights reserved.</p>
      </footer>
    </div>
  );
}
