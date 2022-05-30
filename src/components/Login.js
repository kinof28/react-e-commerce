import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import Context from "../context/context";

export default function Login(props) {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const ctx = useContext(Context);
  const login = (e) => {
    e.preventDefault();
    if (user.username.length < 3 || user.password.length < 3) {
      setError("Fill all fields!");
    } else {
      props.onLogin(user.username, user.password).then((loggedIn) => {
        console.log(ctx.user);
        if (!loggedIn) {
          setError("Invalid Credentails");
        }
      });
    }
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };
  return ctx.user === null ? (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Login</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={login}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Email: </label>
              <input
                className="input"
                type="email"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            {error && <div className="has-text-danger">{error}</div>}
            <div className="field is-clearfix">
              <button className="button is-primary is-outlined is-pulled-right">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Navigate to="/" replace />
  );
}
