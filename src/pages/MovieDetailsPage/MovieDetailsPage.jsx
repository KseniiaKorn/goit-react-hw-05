import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import s from './MovieDetailsPage.module.css'
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const defaultImg =
  'https://dummyimage.com/400x600/f7606a/ffffff.jpg&text=No+Image+Available';
  
const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();

    const backLink = useRef(location.state?.from || "/movies");

    useEffect(() => {
    setError(null);
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(() => {
        setError("Movie not found!");
      })
      .finally();
    }, [movieId]);
    
  if (!movie) return <h2>Loading...</h2>;

  if (error) {
    return <p>{error}</p>;
  }


    return (
      <div className={s.wrap}>
        <NavLink to={backLink.current} className={buildLinkClass}>
          Go back
        </NavLink>
      <h2 className={s.title}>{movie.title}</h2>
      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
            width="250"
            className={s.img}
        />
        <div>
          <p className={s.text}>
            Description: <span className={s.span}>{movie.overview}</span>
          </p>
          <p className={s.text}>
            Rating: <span className={s.span}>{movie.vote_average}</span>
          </p>
          <p className={s.text}>
            Year:{" "}
            <span className={s.span}>
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </span>
          </p>
          <p className={s.text}>
            Duration of the movie:{" "}
            <span className={s.span}>{movie.runtime} minutes</span>
          </p>
        </div>
      </div>
      <nav className={s.nav}>
        <NavLink to={`/movies/${movieId}/cast`} className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to={`/movies/${movieId}/reviews`} className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
