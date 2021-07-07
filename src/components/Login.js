import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { stateContext } from "../stateReducer";

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(stateContext)

  const submit = async (e) => {
    e.preventDefault();
    const user = { email, password };

    const res = await fetch("http://localhost:3001/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200){
        dispatch({
            type: "setToken",
            data
        })
    }else{
        setErrorMessage(data.error)
    }
    console.log(data);

  };
  return (
    <>
      <h2>Login!</h2>
      {errorMessage && <h4>There has been an error: {errorMessage}</h4>}
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Login!</button>
      </form>
    </>
  );
};

export default Login;
