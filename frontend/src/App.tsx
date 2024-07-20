import { useState } from "react";

import { useCSVData } from "./hooks/useCSVData";
import { Navbar } from "./components/Navbar";
import { Cards } from "./components/CardContainer";

const App = () => {
  const [query, setQuery] = useState<string>("a");
  const { data } = useCSVData(query);

  return (
    <div>
      <Navbar query={query} setQuery={setQuery} />
      <Cards data={data} />
    </div>
  );
};

export default App;
