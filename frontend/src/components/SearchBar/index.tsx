import styles from "./styles.module.scss";

const SearchBar = ({ query, setQuery }: { query: string; setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  return <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className={styles.searchBar} />;
};

export default SearchBar;
