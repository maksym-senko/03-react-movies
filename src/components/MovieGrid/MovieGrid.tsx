import type { Movie } from '../../types/movie';
import s from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  if (movies.length === 0) return null;

  return (
    <ul className={s.grid}>
      {movies.map((movie) => (
        <li 
          key={movie.id} 
          className={s.item} 
          onClick={() => onSelect(movie)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelect(movie);
            }
          }}
        >
          <div className={s.card}>
            <img 
              className={s.image}
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster'} 
              alt={movie.title} 
              loading="lazy"
            />
            <div className={s.overlay}>
              <p className={s.title}>{movie.title}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;