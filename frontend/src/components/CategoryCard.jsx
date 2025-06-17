import React from "react";

const CategoryCard = ({ image, title }) => (
  <div className="product-tile">
    <img src={image} alt={title} />
    <span className="product-label">{title}</span>
  </div>
);

export default CategoryCard;