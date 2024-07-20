import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useState } from "react";

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
    <div>
      <h1>CSV Data Viewer</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
};
