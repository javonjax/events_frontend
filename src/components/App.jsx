import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import Page from './Page';
import Footer from './Footer';
import NotFound from './NotFound';
import '../assets/App/styles.css';


const App = () => {
  const routes = ['Popular', 'Local', 'Music', 'Sports', 'Food', 'Family', 'Theater'];

  return (
    <>
    <Router>
      <ScrollToTop/>
      <div className='test'>
        <Navbar/>
        <div className='test2'>
          <Routes>
            <Route path="/" element={<Home/>} />
            {routes.map(route => 
              <Route 
                  key={route}
                  path={`/${route}`}
                  element={<Page route={route}/>}/>
            )}
            <Route path='*'element={<NotFound />}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
    </>
  );
};

export default App;
