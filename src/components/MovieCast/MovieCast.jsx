import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMoviesCredits } from "../../services/api";
import s from './MovieCast.module.css'

const defaultImg =
  'https://dummyimage.com/400x600/f7606a/ffffff.jpg&text=No+Image+Available';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(null);
    getMoviesCredits(movieId)
      .then(setCast)
      .catch(() => {
        setError("Failed to load cast. Please try again later!");
      })
      .finally();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }
  if (cast.length === 0) {
    return <p>No cast available for this movies</p>;
  }

  return (
    <div className={s.wrap} >
      <h3>Actors:</h3>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li className={s.item} key={actor.cast_id}>
            <p className={s.text}>{actor.name}</p>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              className={s.img}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieCast;