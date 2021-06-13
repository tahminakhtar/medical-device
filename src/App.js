import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContextProvider from './context/AuthContext';

import Home from "./Home";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
