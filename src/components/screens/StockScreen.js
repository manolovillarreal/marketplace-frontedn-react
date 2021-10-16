import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { AuthContext } from "../../auth/AuthContext";
import store from "../../assets/img/store.png";
import { Link } from "react-router-dom";
import { AuthModal } from "../auth/AuthModal";
import { CreateProductModal } from "../products/CreateProductModal";
import { ProductList } from "../products/ProductList";
import { getMyProducts } from "../../actions/products";
import { ProductStockList } from "../products/ProductStockList";

export const StockScreen = () => {
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const getStock = async () => {
      const data = await getMyProducts();
      if (data.ok) {
        setProductsList( data.products);
      }
    };

    if (user.logged) {
      getStock();
    }

    return () => {};
  }, [user.logged]);


  const handleCrearProducto = () => {
    setShowModal(true);
  };  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  if(productsList.length>0)
    console.log(ProductList[0]);
  return (
    <>
      {productsList.length > 0 ? (
        <>
        <div className=" text-end">
        <Button variant="light" className="ms-auto" onClick={handleCrearProducto}>Crear Producto</Button>

        </div>
        <ProductStockList productsList={productsList} />
        </>
      ) : (
        <>
          <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={store}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">Crea tu Producto</h2>
                  <p className="card-text">
                    Organiza de manera profesional tu inventario
                  </p>
                  <Link to="/" className="card-text text-info">
                    <small>Conocer mas</small>
                  </Link>
                  <button
                    onClick={handleCrearProducto}
                    className="btn btn-light ms-5"
                  >
                    Crear Producto
                  </button>
                </div>
              </div>
            </div>
          </div>
          {!user.logged && (
            <p className="text-info btn">
              inicia sesion para poder ver tu inventario
            </p>
          )}
         
        </>
      )}
       {!user.logged && showModal && (
            <AuthModal handleCloseModal={handleCloseModal} />
          )}
          {user.logged && showModal && (
            <CreateProductModal
              setShowModal={setShowModal}
              setProductsList={setProductsList}
            />
          )}
    </>
  );
};
