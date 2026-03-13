import { useState, type ChangeEvent, type FormEvent } from 'react';
import s from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const normalizedQuery = searchQuery.trim();

    if (normalizedQuery === "") {
      alert("Будь ласка, введіть текст для пошуку!");
      return;
    }

    onSubmit(normalizedQuery);
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          value={searchQuery}
          onChange={handleChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Пошук фільмів..."
        />
        <button type="submit" className={s.button}>
          Пошук
        </button>
      </form>
    </header>
  );
};

export default SearchBar;