import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottery from "./Lottery";
import MemberList from "./MemberList";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [pageId, setPageId] = useState(0);
  const handleClickHeader = (id) => {
    setPageId(id);
  };

  return (
    <div className="App">
      <Header onClick={handleClickHeader} />
      <div
        style={{
          display: pageId == 0 ? "block" : "none",
        }}
      >
        <Lottery />
      </div>
      {/* <div
        style={{
          display: pageId == 1 ? "block" : "none",
        }}
      >
        <MemberList />
      </div> */}
      <Footer />
    </div>
  );
}

export default App;
