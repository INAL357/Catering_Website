import './Footer.css';
import { useNavigate } from 'react-router-dom';
import facebook_icon from '../assets/Imagex/facebook_icon.png';
import twitter_icon from '../assets/Imagex/twitter_icon.png';
import insta_icon from '../assets/Imagex/insta_icon.png';

function Footer() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    navigate('/AboutUsPage');
  };

  const handleNavigatePolicy = () => {
    navigate('/privacy-policy');
  };

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="footer-logo">Pangala Caterers</h1>
          <p>
            Offering curated cuisine and sustainable catering for every occasion —
            crafted with care and style.
          </p>
          <div className="footer-social-icons">
            <img src={facebook_icon} alt="Facebook" />
            <img src={twitter_icon} alt="Twitter" />
            <img src={insta_icon} alt="Instagram" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={handleNavigateHome}>Home</li>
            <li onClick={handleNavigateAbout}>About Us</li>
            <li onClick={handleNavigatePolicy}>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-98xxxxxx26</li>
            <li>pangalacaters@gmail.com</li>
          </ul>
          <div className="footer-map">
        <iframe
          title="Pangala Caterers Location"
          width="100%"
          height="300"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=13.264513844788182,%2074.75990290958681+(Pangala%20Caterers)&amp;t=h&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
        </div>
      </div>

      

      <hr />

      <p className="footer-copyright">
        © 2024 Pangala Caterers. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
