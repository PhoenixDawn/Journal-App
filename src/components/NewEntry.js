import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { stateContext } from "../stateReducer";

const NewEntry = ({ addToEntries }) => {
  const { categories, dispatch } = useContext(stateContext);

  const [errorMessage, setErrorMessage] = useState();
  const { category_id } = useParams();
  const category = categories.find((cat) => cat.id == category_id);
  const [entry, setEntry] = useState("");
  const history = useHistory();

  useEffect(() => {
    category ? setErrorMessage(null) : setErrorMessage("Invalid Category");
  }, [category]);

  const submit = async(e) => {
    e.preventDefault();
    const newEntry = { category_id: category_id, content: entry };
    const res = await fetch("http://localhost:3001/api/v1/entries", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry),
    });
    const data = res.json()
    dispatch({
      type: "addEntry",
      newEntry
    });

    history.push("/");
  };

  return (
    <div>
      {errorMessage ? (
        <h4 style={{ color: "red" }}>{errorMessage}</h4>
      ) : (
        <>
          <h1>
            New Entry in Category: {errorMessage ? errorMessage : category.name}
          </h1>
          <form onSubmit={submit}>
            <div>
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
              />
            </div>
            <button type="submit">Create Entry</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewEntry;
