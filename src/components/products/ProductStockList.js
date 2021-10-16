import React from "react";
import { Table } from "react-bootstrap";

export const ProductStockList = ({productsList=[]}) => {

  return (
    <Table responsive>
       <thead>
    <tr>
      <th>Nombre</th>
      <th>SKU</th>
      <th>Cantidad</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
      {productsList.map((product) => (
        <tr key={product.id}>  
          <td> {product.name} </td>
          <td> {product.sku} </td>
          <td> {product.cantidad} </td>
          <td> {product.price} </td>
          <td> ...</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};
