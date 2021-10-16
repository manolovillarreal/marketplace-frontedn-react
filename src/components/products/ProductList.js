import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductList = ({productsList=[]}) => {

  return (
    <div className="row row-cols-auto animate__animated animate__fadeIn">
      {productsList.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
