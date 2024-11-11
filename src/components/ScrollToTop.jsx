import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
/*
    This component will set the scroll position to the top of the
    page when navigating between components.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
