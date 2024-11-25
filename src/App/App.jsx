import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Home from '../components/Home';
import CategoryLanding from '../components/CategoryLanding';
import EventInfo from '../components/EventInfo';
import SignInForm from '../components/SignInForm';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import NotFound from '../components/NotFound';
import '../assets/App/styles.css';
import { LocationProvider } from '../components/LocationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  const routes = [
    'Popular',
    'Local',
    'Music',
    'Sports',
    'Food',
    'Family',
    'Arts',
  ];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop />
          <LocationProvider>
            <div className="app">
              <Navbar />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
                style={{fontFamily: "Nunito, sans-serif"}}
              />
              <main className="app-body-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {routes.map((route) => (
                    <Route
                      key={route}
                      path={`/${route}`}
                      element={<CategoryLanding route={route} />}
                    />
                  ))}
                  {routes.map((route) => (
                    <Route
                      key={`${route}-info`}
                      path={`/:route/:id`}
                      element={<EventInfo />}
                    />
                  ))}
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/signin" element={<SignInForm />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LocationProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
