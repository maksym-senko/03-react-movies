import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!movie) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  const imageUrl = movie.backdrop_path || movie.poster_path 
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`
    : 'https://via.placeholder.com/780x440?text=No+Image';

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.content}>
        <img src={imageUrl} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default MovieModal;