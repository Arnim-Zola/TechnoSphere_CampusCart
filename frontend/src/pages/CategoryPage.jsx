import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { type } = useParams();

  return (
    <div>
      <h2>Category: {type}</h2>
    </div>
  );
};

export default CategoryPage;