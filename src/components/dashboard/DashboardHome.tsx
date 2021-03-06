import "./styles/DashboardHome.scss";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div className="dashboard">
      <div className="row row--center">
        <div className="dashboard__card">
          <h2 className="dashboard__card__title">User Dashboard</h2>
          <i className="fas fa-user dashboard__card__icons"></i>
          <p className="dashboard__card__subtitle">Edit user information</p>
          <Link to="/dashboard/user">
            <button className="dashboard__card__btn">
              Go to user dashboard
            </button>
          </Link>
        </div>

        <div className="dashboard__card">
          <h2 className="dashboard__card__title">Garmets Dashboard</h2>
          <i className="fas fa-plus-square dashboard__card__icons"></i>
          <p className="dashboard__card__subtitle">Add a new garmet</p>
          <Link to="/dashboard/garmet">
            <button className="dashboard__card__btn">
              Go to garmets dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
