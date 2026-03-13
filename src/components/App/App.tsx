  import { useState } from 'react';
  import { useQuery } from '@tanstack/react-query';
  import { default as ReactPaginate } from 'react-paginate';  
  import SearchBar from '../SearchBar/SearchBar';
  import MovieGrid from '../MovieGrid/MovieGrid';
  import Loader from '../Loader/Loader';
  import ErrorMessage from '../ErrorMessage/ErrorMessage';
  import MovieModal from '../MovieModal/MovieModal';
  import { fetchMovies } from '../../services/movieService';
  import type { Movie } from '../../types/movie';
  import s from './App.module.css';

  const MAX_TMDB_PAGES = 500;

  export default function App() {
    const [query, setQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const { data, isLoading, isError, isPlaceholderData } = useQuery({
      queryKey: ['movies', query, page],
      queryFn: () => fetchMovies(query, page),
      enabled: query.trim().length > 0,
      placeholderData: (previousData) => previousData,
    });

    const handleSearch = (newQuery: string): void => {
      if (newQuery === query) return;
      setQuery(newQuery);
      setPage(1); 
    };

    const handlePageClick = (event: { selected: number }): void => {
      setPage(event.selected + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;
    const displayPages = totalPages > MAX_TMDB_PAGES ? MAX_TMDB_PAGES : totalPages;

    return (
      <div className={s.container}>
        <SearchBar onSubmit={handleSearch} />
        
        {isError && <ErrorMessage />}
        
        {isLoading && !isPlaceholderData && query !== '' && <Loader />}
        
        <div className={isPlaceholderData ? s.searching : ''}>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </div>

        {displayPages > 1 && (
          <ReactPaginate
            pageCount={displayPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            forcePage={page - 1}
            containerClassName={s.pagination}
            activeClassName={s.active}
            pageClassName={s.pageItem}
            nextClassName={s.pageItem}
            previousClassName={s.pageItem}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        {selectedMovie && (
          <MovieModal 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </div>
    );
  }