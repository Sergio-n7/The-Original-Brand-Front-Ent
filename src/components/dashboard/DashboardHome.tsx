import "./styles/DashboardHome.scss";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="dashboard">
      <div className="row row--center">
        <div className="dashboard__cart">
          <h2 className="dashboard__cart__title">User Dashboard</h2>
          <i className="fas fa-user dashboard__cart__icons"></i>
          <p className="dashboard__cart__subtitle">Edit user information</p>
          <Link to="/dasboard/user">
            <button className="dashboar__cart__btn">
              Go to user dashboard
            </button>
          </Link>
        </div>

        <div className="dashboard__cart">
          <h2 className="dashboard__cart__title">Garmet dashboard</h2>
          <i className="fas fa-plus-square dashboard__cart__icons"></i>
          <p className="dashboard__cart_subtitle">Add a new garmet</p>
          <Link to="/dashboard/garmet">
            <button className="dashboard__cart__btn">
              Go to garmet dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
