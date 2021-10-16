import { useEffect, useRef, useState } from "react";

export const useFetch = (url, token) => {
  const isMounted = useRef(true);
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    setState({
      data: null,
      loading: true,
      error: null,
    });

    let headers = {};
    if (token) {
      headers["x-token"] = localStorage.getItem("token");
    }

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setState({
            loading: false,
            error: null,
            data,
          });
        }
      })
      .catch(() => {
        setState({
          data: null,
          loading: false,
          error: "No se pudo cargar la info",
        });
      });
  }, [url,token]);

  return state;
};
