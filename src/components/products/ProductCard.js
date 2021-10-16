import React from "react";
import product_default from '../../assets/img/product_default.png';
import { currency } from "../../helpers/currency";



export const ProductCard = ({
  id,
  name,
  sku,
  price,
  user,
}) => {
  return (
    <div className="card m-3" style={{ maxWidth: 230 }}>
      <div className="row g-0">
        <div className="col-12 ">
          <img
            // src={`./assets/heroes/${id}.jpg`}
            src={product_default}
            className="img-fluid rounded-start"
            alt={name}
          />
        </div>
        <div className="col text-center">
            <h5 className="card-title ">{name}</h5>
            <p className="card-text">{sku}</p>
            <p className="card-text">
                <small className="text-muted">{currency(price)}</small>
            </p>
        </div>
      </div>
    </div>
  );
};
