import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Page from './Page';
import Footer from './Footer';
import '../assets/App/styles.css';


const App = () => {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/music" element={<Page/>} />
        <Route path="/sports" element={<Page/>} />
        <Route path="/food" element={<Page/>} />
        <Route path="/family" element={<Page/>} />
        <Route path="/theater" element={<Page/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );
};

export default App;
