import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import stateReducer, { stateContext } from "./stateReducer";

// Components
import Home from "./components/Home";
import NewEntry from "./components/NewEntry";
import CategorySelection from "./components/CategorySelection";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";
import Login from "./components/Login";

//Style sheet
import "./style.css";

function App() {
  const [store, dispatch] = useReducer(stateReducer, {
    categories: [],
    entries: [],
    token: localStorage.getItem("token"),
  });

  // Fetch Categories
  useEffect(() => {
    if (!store.token) return;
    const fetchCategories = async () => {
      let res = await fetch("http://localhost:3001/api/v1/categories");
      let data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        dispatch({
          type: "setCategories",
          data: data,
        });
      } else {
        localStorage.setItem("token");
        dispatch({
          type: "setToken",
          data: { token: null },
        });
      }
    };
    fetchCategories();
  }, [store.token]);

  // Fetch entries
  useEffect(() => {
    if (!store.token) return;
    const fetchEntries = async () => {
      let res = await fetch("http://localhost:3001/api/v1/entries");
      let data = await res.json();
      if (res.status === 200){
        dispatch({
          type: "setEntries",
          data: data,
        });
      }else{
        localStorage.setItem("token")
        dispatch({
          type: "setToken",
          data: { token: null }
        })
      }

    };
    fetchEntries();
  }, [store.token]);

  return (
    <stateContext.Provider value={{ ...store, dispatch }}>
      {store.token ? (
        <>
          <h1>Journal</h1>
          <BrowserRouter>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/category" component={CategorySelection} />
              <Route
                exact
                path="/entry/new/:category_id"
                component={NewEntry}
              />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </>
      ) : (
        <Login />
      )}
    </stateContext.Provider>
  );
}

export default App;
