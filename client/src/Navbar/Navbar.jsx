import "./Navbar.css";
import { useNavigate } from "react-router-dom"; 
import New_Logo from '../assets/Imagex/New_Logo.jpg';
const Navbar = ({ handleScrollTo }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const handleAboutUs = () => {
    navigate("/AboutUsPage");
  };

  return (
    <div className="Navbar_container">
      <div className="logo">
        <img src={New_Logo} alt="Pangala caterers" />
        <h1 onClick={handleNavigateHome}>Pangala caterers</h1>
      </div>
      <ul className="Menu">
        <li><button onClick={handleNavigateHome}><h3>Home</h3></button></li>
        <li>
          <button
    onClick={() => {
      if (window.location.pathname !== "/") {
        navigate("/#menu");
      } else {
        handleScrollTo("Menu");
      }
    }}
  >
        <h3>Menu</h3>
        </button></li>
        <li><button onClick={() => navigate("/OurWork")}><h3>Our Work</h3></button></li>
       <li><button
        onClick={() => {
        if (window.location.pathname !== "/") {
        navigate("/#contact");
        } else {
        handleScrollTo("contact");
        }
        }}
        >
        <h3>Contact</h3>
        </button></li>
        <li><button onClick={handleAboutUs}><h3>About Us</h3></button></li>
      </ul>
    </div>
  );
};


export default Navbar;
