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
        <Route path="/music" element={<Page route='music'/>} />
        <Route path="/sports" element={<Page route='sports'/>} />
        <Route path="/food" element={<Page route='food'/>} />
        <Route path="/family" element={<Page route='family'/>} />
        <Route path="/theater" element={<Page route='theater'/>} />
        <Route path='/popular' element={<Page route='popular'/>} />
        <Route path='/local' element={<Page route='local'/>} />
      </Routes>
      <Footer/>
    </Router>
    </>
  );
};

export default App;
