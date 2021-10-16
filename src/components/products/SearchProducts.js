import React from "react";
import { Form,Button,InputGroup } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";

export const SearchProducts= ({setProductList}) => {
  const history = useHistory();
  const location = useLocation();
  const { q = "",maxPrice,minPrice } = queryString.parse(location.search);

  const [{ searchText }, handleInputChange] = useForm({
    searchText: q,
  });

  

  const handleSearch = (e) => {
    e.preventDefault();

    let search= "";
    if(searchText)
      search='q='+searchText;
    if(maxPrice)
      search+="&maxPrice="+maxPrice;
    if(minPrice)
      search+="&minPrice="+minPrice;

    history.push(`?${search}`);
  };

  return (
      <div className="row">
        <div className="col-8">
          <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <Form.Control
              name="searchText"
              type="text"
              placeholder="Buscar por nombre y/o SKU"
              className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange}
            />
              <Button
                type="submit"
                variant = "secondary"
              >
                Search...
              </Button>
              </InputGroup>
          </Form>
        </div>
      </div>
  );
};
