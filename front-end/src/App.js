import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutesUse } from "./routes";

function App() {
  const routes = RoutesUse(true);
  return (
    <Router>
      <div className="container">{routes}</div>;
    </Router>
  );
}
export default App;
