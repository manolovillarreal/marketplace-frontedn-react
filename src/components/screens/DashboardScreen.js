import React, {  useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import { ProductList } from "../products/ProductList";
import { SearchProducts } from "../products/SearchProducts";

const url = `${process.env.REACT_APP_API_URL}/products`;


export const DashboardScreen = () => {
  const [productsList, setProductsList] = useState([]);

  const location = useLocation();

  const { data, loading } = useFetch(url+'/'+location.search);


  useEffect(() => {
    if(data && data.ok)
      setProductsList(data.products)

  }, [data,loading]);

  return (
    <div>
      <SearchProducts  />
      <hr/>
          {
            (loading)
            ?<h3> cargando ...</h3>
            :(
              (productsList.length> 0)
                ? <ProductList productsList={productsList}/> 
                : <h3>No hay informacion</h3>
              )
          }
            
    </div>
  );
};
