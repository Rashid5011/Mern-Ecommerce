import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, getAllProducts } from "../../actions/productAction";
import { Fragment, useEffect, useState } from "react";
import { Vortex as Loader } from "react-loader-spinner";
import MetaData from "../MetaData";
import ProductCard from "../ProductCard/Product";
import { Pagination, Slider, Typography } from "@mui/material";
const Products = () => {
  const url = window.location.pathname;
  const parts = url.split("/");
  const keyword = parts[parts.length - 1];
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    products,
    productCounts,
    resultPerPage,
    // filteredProductsCount,
    error,
  } = useSelector((state) => state.products);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const categories = [
    "laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const data = products.products;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  // let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      dispatch(clearAllError());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS " />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {data &&
              data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {/* {resultPerPage === count && ( */}
          <div className="paginationBox">
            <Pagination
              activepage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCounts}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          {/* )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
