import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import Page from './Page';
import EventInfo from './EventInfo';
import Footer from './Footer';
import NotFound from './NotFound';
import { LocationProvider } from './LocationContext';
import '../assets/App/styles.css';


const App = () => {
  const routes = ['Popular', 'Local', 'Music', 'Sports', 'Food', 'Family', 'Theater'];

  return (
    <>
    <Router>
      <ScrollToTop/>
      <LocationProvider>
      <div className='app'>
        <Navbar/>
        <div className='app-body-content'>
          <Routes>
            <Route path="/" element={<Home/>} />
            {routes.map(route => 
              <Route 
                  key={route}
                  path={`/${route}`}
                  element={<Page route={route}/>} />
            )}
            {routes.map(route => 
              <Route 
                  key={`${route}-info`}
                  path={`/${route}/:id`}
                  element={<EventInfo />} />
            )}
            <Route path='*'element={<NotFound />}/>
          </Routes>
        </div>
        <Footer/>
      </div>
      </LocationProvider>
    </Router>
    </>
  );
};

export default App;
