import React from 'React'
import "./Navbar.css";
import New_Logo from '../assets/Imagex/New_Logo.jpg';
const Navbar = () => {

  return (
    <div className="Navbar_container">
      <div className="logo">
        <img src={New_Logo} alt="Pangala caterers" />
        <h1 >Pangala caterers</h1>
      </div>
      <ul className="Menu">
        <li><button><h3>Home</h3></button></li>
        <li><button><h3>Menu</h3></button></li>
        <li><button><h3>Our Work</h3></button></li>
       <li><button><h3>Contact</h3></button></li>
        <li><button><h3>About Us</h3></button></li>
      </ul>
    </div>
  );
};


export default Navbar;
