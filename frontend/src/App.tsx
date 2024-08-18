import { useState } from "react";

import { useCSVData } from "./hooks/useCSVData";
import { Navbar } from "./components/Navbar";
import { Cards } from "./components/Cards";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const { data } = useCSVData(query);

  return (
    <div style={{ width: "100%" }}>
      <Navbar query={query} setQuery={setQuery} />
      <h1 style={{padding:'1rem', textAlign:"center"}}>Got a job in the meantime, thanks for the fast reply</h1>
    </div>
  );
};

export default App;
