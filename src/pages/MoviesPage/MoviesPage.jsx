import React, { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/api';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setError(null);
    setLoading(true);
    if (query.trim()) {
      const getMoviesQuery = async () => {
        try {
          const results = await searchMovies(query);
          setMovies(results);
        } catch {
          setError("Something went wrong!");
        } finally {
          setLoading(false);
        }
      };
      getMoviesQuery();
    } else {
      setLoading(false);
      setMovies([]);
    }
  }, [query]);
  
  const handleSearch = (newQuery) => {
    if (newQuery === "") {
      setSearchParams({});
    } else {
      setSearchParams({ query: newQuery });
    }
  };


  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
