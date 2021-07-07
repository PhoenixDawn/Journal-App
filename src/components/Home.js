import { useContext } from "react";
import { stateContext } from "../stateReducer";

const Home = () => {
  const { categories, entries } = useContext(stateContext);
  return (
    <div>
      <h1>Home</h1>
      {/* {entries.map((entry) => {
        let category = categories.find(cat => cat.id == entry.category_id)
        return category ? (
          <div key={entry.id}>
             <h2>{category.name}</h2>
            <p>{entry.content}</p>
          </div>
        ) : ""
      })} */}
      {categories.map((cat) => {
        return (
          <div>
            <h2>{cat.name}</h2>
            {entries.map((entry) => {
              return (
                <div key={entry.id}>
                  <p>{entry.content}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
