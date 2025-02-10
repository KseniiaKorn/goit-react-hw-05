import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { getTrendingMovies } from "../../services/api";
import s from './HomePage.module.css'

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const getAllMobies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError("Movies is not found!");
      } finally {
        setLoading(false);
      }
    };
    getAllMobies();
  }, []);

  return (
    <>
      <h2 className={s.title}>Trending today</h2>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;