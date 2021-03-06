import { createContext } from "react";

export default function stateReducer(currentState, action) {
  switch (action.type) {
    case "addEntry": {
      return {
        ...currentState,
        entries: [...currentState.entries, action.newEntry],
      };
    }
    case "setEntries": {
      return{
        ...currentState,
        entries: action.data
      }
    }
    case "setToken": {
      localStorage.setItem("token", action.data.token)
      return{
        ...currentState,
        token: action.data.token
      }
    }
    case "setCategories":{
      return{
        ...currentState,
        categories: action.data
      }
    }
    default:
      return currentState;
  }
}

export const stateContext = createContext()