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
      <Cards data={data} />
    </div>
  );
};

export default App;
