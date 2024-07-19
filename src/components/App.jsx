import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from './homepage/Home';
import Page from './Page';
import '../assets/App/styles.css';


const App = () => {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/music" element={<Page/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
