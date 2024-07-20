import styles from "./styles.module.scss";

const SearchBar = ({ query, setQuery }: { query: string; setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <input
      data-testid="search-input"
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className={styles.searchBar}
    />
  );
};

export default SearchBar;
