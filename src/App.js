import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottery from "./Lottery";
import MemberList from "./MemberList";
import Header from "./Header";

function App() {
  const [pageId, setPageId] = useState(0);
  const handleClickHeader = (id) => {
    setPageId(id);
  };

  return (
    <div className="App">
      <Header onClick={handleClickHeader} />
      {pageId == 0 ? <Lottery /> : <MemberList />}
    </div>
  );
}

export default App;
