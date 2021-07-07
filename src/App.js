import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import stateReducer, { stateContext } from "./stateReducer";

// Components
import Home from "./components/Home";
import NewEntry from "./components/NewEntry";
import CategorySelection from "./components/CategorySelection";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";

function App() {
  const [store, dispatch] = useReducer(stateReducer, {
    categories: [],
    entries: [],
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      let res = await fetch("http://localhost:3001/api/v1/categories");
      let data = await res.json();
      // console.log(data);
      dispatch({
        type: "setCategories",
        data: data
      })
    };
    fetchCategories()
  }, []);

  // Fetch entries
  useEffect(() => {
    const fetchEntries = async () => {
      let res = await fetch("http://localhost:3001/api/v1/entries")
      let data = await res.json()
      dispatch({
        type: "setEntries",
        data: data
      })
    }
    fetchEntries()
  }, [])

  return (
    <stateContext.Provider value={{ ...store, dispatch }}>
      <h1>Journal</h1>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/category">
            <CategorySelection />
          </Route>

          <Route exact path="/entry/new/:category_id">
            <NewEntry />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </stateContext.Provider>
  );
}

export default App;
