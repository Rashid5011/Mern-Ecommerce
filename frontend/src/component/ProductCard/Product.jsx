import ReactStars from "react-rating-stars-component";
import "../Home/Home.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "red",
    activeColor: "yellow",
    size: 20,
    value: product.rating,
    isHalf: true,
  };

  return (
    <div>
      <Link className="productCard" to={`product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <ReactStars {...options} />{" "}
          <span>{product.numberOfReviews[0]}reviews</span>
        </div>
        <span>{product.price}</span>
      </Link>
    </div>
  );
};

export default Product;
