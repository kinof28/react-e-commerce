import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";
import Context from "./context/context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useEffect } from "react";
function App() {
  const ctx = useContext(Context);
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    ctx.user = user;
  }, [ctx]);
  const login = async (email, password) => {
    const res = await axios
      .post("http://localhost:3001/login", { email, password })
      .catch((res) => {
        return { status: 401, message: "Unauthorized" };
      });

    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken);
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1,
      };
      ctx.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };
  const logout = (e) => {
    e.preventDefault();
    ctx.user = null;
    localStorage.removeItem("user");
  };
  return (
    <Context.Provider value={{ user: null, cart: {}, products: [] }}>
      <nav
        className="navbar container"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <b className="navbar-item is-size-4 ">ecommerce</b>
          <label
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            // onClick={(e) => {
            //   e.preventDefault();
            //   this.setState({ showMenu: !this.state.showMenu });
            // }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
        <div
          // className={`navbar-menu  ${this.state.showMenu ? "is-active" : ""}`}
          className={`navbar-menu is-active`}
        >
          <Link to="/products" className="navbar-item">
            Products
          </Link>
          {ctx.user && ctx.user.accessLevel < 1 && (
            <Link to="/add-product" className="navbar-item">
              Add Product
            </Link>
          )}
          <Link to="/cart" className="navbar-item">
            Cart
            <span className="tag is-primary" style={{ marginLeft: "5px" }}>
              {Object.keys(ctx.cart).length}
              {/* {5} */}
            </span>
          </Link>
          {!ctx.user ? (
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          ) : (
            <Link to="/" onClick={logout} className="navbar-item">
              Logout
            </Link>
          )}
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="login" element={<Login onLogin={login} />} />
          <Route path="cart" element={<ProductCard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
