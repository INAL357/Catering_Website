import './App.css';
import Navbar from './Navbar/Navbar.jsx';
import VideoDisplay from './Hero/VidDisplay.jsx';
import Menu from './MenuType/MenuType.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import AboutUsPage from './About-us/AboutUs.jsx';
import ContactPage from './Contact/ContactPage.jsx';

import BookNowPage from './Book-Now/BookNowPage.jsx';
import LayoutWithFooter from './Footer/footerLayout.jsx';
import CreateDishes from './AdminPageView/CreateDishes.jsx';
import ChooseOption from './AdminPageView/ChooseOption.jsx';

import UploadWork from './AdminPageView/UploadWork.jsx';
import { useEffect, useRef } from "react";


function App() {
  const menuRef = useRef();
  const contactRef = useRef();
  const homeContactRef =useRef();
  const location = useLocation();

  const handleScrollToRef = (section) => {
    if (section === "Menu") {
      menuRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };



  useEffect(() => {
  if (location.pathname === "/" && window.location.hash === "#contact") {
    setTimeout(() => {
      homeContactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); 
  }
}, [location]);


  const setMultipleRef = (el)=>{
    contactRef.current=el;
    homeContactRef.current=el;
  
  }
  return (
    <div className="App">
     
  

      <Navbar handleScrollTo={handleScrollToRef} />

      <LayoutWithFooter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VideoDisplay />
                <div ref={menuRef}>
                  <Menu />
                </div>
                <div ref={setMultipleRef}
                >
                </div>
               
      
              </>
            }
          />
          <Route path="/BookNowPage" element={<BookNowPage />} />
          <Route path="/UploadWork" element={<UploadWork />}/>
          <Route path="/ChooseOption" element={<ChooseOption />}/>
          <Route path="/CreateDishes" element={<CreateDishes />}/>
          <Route path="/AboutUsPage" element={<AboutUsPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
       
        </Routes>
      </LayoutWithFooter>
    </div>
  );
}


export default App;
