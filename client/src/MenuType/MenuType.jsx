import React, { useEffect, useState } from "react";
import data from "../assets/data.js"; // category buttons
import "./MenuType.css"; // styles for both buttons and dishes

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dishes on mount
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/dishes");
        const data = await res.json();
        setDishes(data);
        setFilteredDishes(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(
        (dish) => dish.type.toLowerCase() === categoryId
      );
      setFilteredDishes(filtered);
    }
  };

  return (
    <div className="menu-container">
      <div className="heading">
        <h1>Select Preference as Needed</h1>
      </div>

      {/* Category Buttons */}
      <div className="menu-items-row">
        {data.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${item.className}`}
            title={item.hint}
            onClick={() => handleCategoryClick(item.id)}
          >
            {item.image && (
              <img src={item.image} alt={item.title} className="menu-image" />
            )}
            <span className="menu-title">{item.title}</span>
          </div>
        ))}
      </div>

      {/* Dish Display */}
      <div className="menu-display">
        <h2 style={{ marginTop: "2rem" }}>
          {activeCategory === "all"
            ? "All Dishes"
            : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Dishes`}
        </h2>

        {isLoading ? (
          <p>Loading dishes...</p>
        ) : filteredDishes.length === 0 ? (
          <p>No dishes found.</p>
        ) : (
          <div className="dishes-grid">
            {filteredDishes.map((dish) => (
              <div className="dish-card" key={dish._id}>
                <img
                  src={`http://localhost:4000${dish.image}`}
                  alt={dish.name}
                  className="dish-image"
                />
                <div className="dish-info">
                  <h4>{dish.name}</h4>
                  <p className="dish-type">{dish.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
