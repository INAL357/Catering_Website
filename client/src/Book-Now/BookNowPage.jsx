import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookNowPage.css"

const BookNowPage = () => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.showBookingDialog) {
      setOpenDialog(true);
    }
  }, [location.state]);

  const handleClose = () => {
    setOpenDialog(false);
    navigate("/")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log("Booking submitted:", data);
    alert("Booking Successful!");
    setOpenDialog(false);
  };

  return (
    <div className="book-page">
      <h1>Book Catering</h1>

      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleSubmit} className="booking-form">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="date" name="date" required />
              <input type="number" name="guests" placeholder="Number of Guests" required />
              <div className="button-group">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookNowPage;
