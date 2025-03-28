import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookItem from '../../components/Books/BookItem/BookItem';
import Banner from '../../images/home_banner.jpg';
import styles from './Home.module.css';
import { getBooks } from '../../lib/common';
import Pagination from '../../components/Pagination';

function Home() {
  const [books, setBooks] = useState([]); // Initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    async function getBooksList() {
      const data = await getBooks();
      if (data) {
        setBooks(data);
        setLoading(false);
      }
    }
    getBooksList();
  }, []);

  // Filter the books based on the selected genre
  const filteredBooks = selectedGenre && selectedGenre !== 'Tous' ? books.filter((book) => book.genre === selectedGenre) : books;

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
  };

  // Pagination logic
  const lastPostIndex = currentPage * booksPerPage;
  const firstPostIndex = lastPostIndex - booksPerPage;
  const currentBooks = filteredBooks.slice(firstPostIndex, lastPostIndex);

  const displayBooks = () => {
    if (loading) return <h1>Chargement...</h1>;
    if (filteredBooks.length === 0) return <h1>Aucun livre trouvé</h1>;
    return currentBooks.map((book) => (
      <BookItem size={2} book={book} key={book.id} />
    ));
  };

  const backgroundImageStyle = { backgroundImage: `url(${Banner})` };

  useEffect(() => {
    axios('http://localhost:4000/api/categories') // Adjust API URL if necessary
      .then((response) => setGenres(response.data))
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  return (
    <div className={styles.Home}>
      <div className={styles.banner} style={backgroundImageStyle} />
      <main className={styles.main}>
        <header className={styles.head}>
          <h1>Nos Livres</h1>
          <p>à lire et à relire</p>
          <Link to="/Ajouter" className="button">
            + Ajouter un livre
          </Link>
        </header>

        <section className={styles.genre}>
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">Sélectionner un genre</option>
            <option value="Tous">Tous</option>
            {genres.map((genre, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </section>
        <section className={styles.bookList}>{displayBooks()}</section>
        <section className={styles.pagination}>
          <Pagination
            totalBooks={filteredBooks.length} // Total filtered books
            booksPerPage={booksPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
