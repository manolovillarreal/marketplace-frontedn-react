import React,{useRef} from "react";
import { Form, FloatingLabel,Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";

export const SideBarPublic = () => {

  const minRef = useRef(null)

  const history = useHistory();
  const location = useLocation();
  const { q = "",maxPrice:max='',minPrice:min='' } = queryString.parse(location.search);


  const [{ maxPrice, minPrice,range }, handleInputChange] = useForm({
    maxPrice: max,
    minPrice:min,
    range:0,
  });

  const handleFilters = (e) => {
    e.preventDefault();
    console.log('filter');
    let query= q;
    if(!isNaN(maxPrice))
      query+="&maxPrice="+maxPrice;
    if(!isNaN(minRef.current.value))
      query+="&minPrice="+minRef.current.value;
    history.push(`?q=${query}`);
  };

  return (
  
        <div
          id="sidebar-nav"
          className="list-group border-0 rounded-0 text-sm-start min-vh-100"
        >
          <h4 className="m-3">Fitros </h4>
          <Form onSubmit={handleFilters}>
            <FloatingLabel
              controlId="floatingInput"
              label="Precio Maximo"
              className="m-3"
            >
              <Form.Control
                name="maxPrice"
                value={maxPrice}
                onChange={handleInputChange}
                type="number"
                placeholder="$"
                size="sm"
              />
            </FloatingLabel>

            <Form.Group className="m-3">
              <FloatingLabel
              controlId="floatingInput"
              label="Precio Minimo"
            >
              <Form.Control
                name="minPrice"
                value={(maxPrice > 0)?range*maxPrice/100:minPrice}
                onChange={handleInputChange}
                type="number"
                placeholder="$"
                size="sm"
                ref={minRef}
                
              />
            </FloatingLabel>
            {
              (maxPrice > 0) && (
                <Form.Range
                name="range"
                value={range}
                onChange={handleInputChange}
              />
              )
            }
              
            </Form.Group>
            <Form.Group className="m-3 text-end">
            <Button
                type="submit"
                variant = "secondary"
              >
                Search...
              </Button>
            </Form.Group>
          </Form>
        </div>
  );
};
