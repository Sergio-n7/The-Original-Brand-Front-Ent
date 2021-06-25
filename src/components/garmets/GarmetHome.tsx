import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GarmetCard from "./GarmetCard";
import CartDrawer from "../cart/CartDrawer";
import { CircularProgress } from "@material-ui/core";

import { fechtGarmets } from "../../redux/actions/garmetActions";
import { getCart } from "../../redux/actions/cartActions";

export type Review = {
  name: string;
  rating: number;
  comment: string;
};

export type Garmet = {
  _id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  variant: {
    price: number;
    color?: string;
    size?: string;
  };
  image: string;
  totalRating: number;
  reviews: Review[];
};

type State = {
  garmet: {
    filteredGarmets: Garmet[];
    error: Error | null;
  };
};

const GarmetHome = () => {
  const dispatch = useDispatch();
  const { filteredGarmets } = useSelector((state: State) => state.garmet);

  useEffect(() => {
    dispatch(fechtGarmets());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <div className="row row--center">
        {filteredGarmets.length ? (
          filteredGarmets.map((garmet: Garmet) => (
            <GarmetCard key={garmet._id} garmet={garmet} />
          ))
        ) : (
          <div className="loading">
            <CircularProgress />
          </div>
        )}
      </div>
      <CartDrawer />
    </div>
  );
};

export default GarmetHome;
