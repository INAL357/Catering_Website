import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LayoutWithFooter = ({ children }) => {
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/BookNowPage" || location.pathname === "/AboutUsPage" || location.pathname === "/OurWork" 
      || location.pathname === "/CreateDishes" || location.pathname === "/ChooseOption" || location.pathname ==="/UploadWork"
    )
 {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default LayoutWithFooter;
