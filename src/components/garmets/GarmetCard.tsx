import { Link } from "react-router-dom";

import Rating from "./Rating";
import { Garmet } from "./GarmetHome";

import "./styles/GarmetCard.scss";

const GarmetCard = ({ garmet }: { garmet: Garmet }) => {
  return (
    <div className="card">
      <Link to={`/garmets/${garmet._id}`}>
        <img className="card__img" src={garmet.image} alt={garmet.name} />
      </Link>
      <div className="card__body">
        <Link to={`/garmets/${garmet._id}`}>
          <h2>{garmet.name}</h2>
        </Link>
        <Rating reviews={garmet.reviews.length} rating={garmet.totalRating} />
        <div className="card__body__price">
          <h1>${garmet.variant.price}</h1>
        </div>
      </div>
    </div>
  );
};

export default GarmetCard;
