import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom"; // Import useNavigate

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          element={(props) => {
            if (isAuthenticated === false) {
              navigate("/login");
              return null;
            }

            if (isAdmin === true && user.role !== "admin") {
              navigate("/login");
              return null;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
