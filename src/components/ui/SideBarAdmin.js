import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import queryString from "query-string";

const url = `${process.env.REACT_APP_API_URL}/users/stores`;

export const SideBarAdmin = () => {
  const [storesList, setStoreList] = useState([]);
  const checkBoxesRef = useRef(null);

  const history = useHistory();
  const location = useLocation();

  const { stores = [] } = queryString.parse(location.search, {
    arrayFormat: "index",
  });
  const { data, loading } = useFetch(url + "/" + location.search, true);

  useEffect(() => {
    if (data && data.ok) {
      setStoreList(data.users);
    }
  }, [data, loading]);

  useEffect(() => {
    if(checkBoxesRef != null){
      for (const store of stores) {
        let checkbox = document.getElementById(store);
        if(checkbox)
          checkbox.checked =true;
        else{
          break
        }
      }
    }
  }, [stores,checkBoxesRef])
  const handleCheck = (e) => {
    console.log(stores);
    console.log(stores.indexOf(e.target.id));
    if (e.target.checked && !stores.includes(e.target.id))
        stores.push(e.target.id);
    if (!e.target.checked && stores.includes(e.target.id))
        stores.splice(stores.indexOf(e.target.id), 1);

    history.push(
      `?${queryString.stringify({ stores: stores }, { arrayFormat: "index" })}`
    );
  };
  return (
    <div
      id="sidebar-nav"
      className="list-group border-0 rounded-0 text-sm-start min-vh-100"
    >
      <h4 className="m-3">Fitros </h4>
      <Form className="m-3" ref={checkBoxesRef}>
        {storesList.length>0 && (
          <div ref={checkBoxesRef} >
            {storesList?.map((store) => (
              <div key={`store-${store.uid}`}>
                <Form.Check
                  type="checkbox"
                  id={store.name}
                  label={store.name}
                  onClick={handleCheck}
                />
              </div>
            ))}
          </div>
        )}
      </Form>
    </div>
  );
};
