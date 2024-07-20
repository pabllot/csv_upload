import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { notify } from "../../Toast";

const FileUpload = ({ query }: { query: string }) => {
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

      notify({ type: "success", message: "File Uploaded!" });
      setFile(null);
    } catch (error) {
      console.log(error);
      notify({ type: "error", message: "Failed to upload the file!" });
      setFile(null);
    }
  };

  return (
    <div className={styles.fileContainer}>
      <label htmlFor="file" className={styles.fileButton}>
        Select File
      </label>
      <input id="file" type="file" accept=".csv" onChange={handleFileChange} className={styles.fileButton} />
      <button disabled={!file} onClick={handleUpload} className={styles.submitButton}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
