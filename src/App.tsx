import React from "react";

// import styling
import "./styles/variables.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./styles/App.css";

// import components
import AppRouter from "./components/Router";

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
