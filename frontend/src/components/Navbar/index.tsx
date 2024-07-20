import FileUpload from "../FileUpload";
import SearchBar from "../SearchBar";
import styles from "./styles.module.scss";

type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const Navbar = ({ query, setQuery }: Props) => {
  return (
    <div className={styles.container} data-testid="navbar">
      <div className={styles.wrapper}>
        <FileUpload query={query} />
        <SearchBar query={query} setQuery={setQuery} />
      </div>
    </div>
  );
};
