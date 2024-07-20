import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useState } from "react";

import styles from "./styles.module.scss";

export const Navbar = ({ query, setQuery }: any) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post("/api/files", formData);
      queryClient.invalidateQueries({ queryKey: [`csv`, query] });

      alert("File uploaded successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to upload file.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.fileContainer}>
          <label htmlFor="file" className={styles.fileButton}>
            Select File
          </label>
          <input id="file" type="file" accept=".csv" onChange={handleFileChange} className={styles.fileButton} />
          <button disabled={!file} onClick={handleUpload} className={styles.submitButton}>
            Upload
          </button>
        </div>
        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className={styles.searchBar} />
      </div>
    </div>
  );
};
