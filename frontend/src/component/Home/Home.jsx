import "./Home.css";
import ProductCard from "../ProductCard/Product.jsx";
import MetaData from "../MetaData";
import { getAllProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

import { Vortex } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  const data = products.products;
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <MetaData title="Home" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      {error ? <Alert severity="error">{error}</Alert> : <></>}

      {loading ? (
        <Vortex
          className="productCard"
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      ) : (
        <div className="container" id="container">
          {data &&
            data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
