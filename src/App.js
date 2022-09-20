import React from "react";
import Provider from "./context/provider";
import Rotas from "./routes";

function App() {
  return (
    <div style={{ backgroundColor: "#180b41" }}>
      <Provider>
        <Rotas />
      </Provider>
    </div>
  );
}

export default App;
