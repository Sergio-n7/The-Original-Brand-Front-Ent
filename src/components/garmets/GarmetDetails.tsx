/* eslint-disable jsx-a11y/no-onchange */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Garmet, Review } from "./GarmetHome";
import Rating from "./Rating";
import ReviewCreation from "./ReviewCreation";
import {
  deleteGarmet,
  fetchGarmetsDetails,
} from "../../redux/actions/garmetActions";

import "./styles/GarmetDetails.scss";
import CartDrawer from "../cart/CartDrawer";
import { User } from "../../redux/types/types";
import { createCart, getCart } from "../../redux/actions/cartActions";

type State = {
  cart: {
    qty: number;

    errorCreateCart: Error | null;
  };
  garmet: {
    garmets: Garmet[];
    error: Error | null;
    garmetDetail: Garmet | string;
    errorDetail: Error | null;
    errorDeleteGarmet: Error | null;
  };
  user: {
    user: User | null;
  };
};

const GarmetDetails = () => {
  const dispatch = useDispatch();

  const { garmetDetail, errorDeleteGarmet } = useSelector(
    (state: State) => state.garmet
  );
  const { user } = useSelector((state: State) => state.user);

  const { qty, errorCreateCart } = useSelector((state: State) => state.cart);

  const { garmetId } = useParams<{ garmetId: string }>();

  useEffect(() => {
    dispatch(fetchGarmetsDetails(garmetId));
    dispatch(getCart());
  }, [dispatch, garmetId]);

  return (garmetDetail as Garmet) ? (
    <div>
      {user?.isAdmin ? (
        <div>
          <Link
            to={`/dashboard/garmet/${garmetId}`}
            className="delete-edit-item"
          >
            <EditIcon />
            <p>Edit Item</p>
          </Link>
          <Link
            to="/dashboard"
            className="delete-edit-item"
            onClick={() => dispatch(deleteGarmet(garmetId))}
          >
            <DeleteForeverIcon />
            <p>Delete Item</p>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="details row">
        {errorDeleteGarmet ? (
          <div className="error">
            Garmet was not deleted: {errorDeleteGarmet.message}
          </div>
        ) : (
          ""
        )}
        <div className="details__item col-1">
          <img
            className="details__img"
            src={(garmetDetail as Garmet).image}
            alt={(garmetDetail as Garmet).name}
          />
        </div>
        <div className=" details__item col-1">
          <ul>
            <li>
              <h2>{(garmetDetail as Garmet).name}</h2>
            </li>
            <li>
              <Rating
                rating={(garmetDetail as Garmet).totalRating}
                reviews={(garmetDetail as Garmet).reviews.length}
              />
            </li>
            <li>Price: ${(garmetDetail as Garmet).variant.price}</li>
            <li className="details__subtitle">
              <p>Description: {(garmetDetail as Garmet).description}</p>
            </li>
            {(garmetDetail as Garmet).variant.color ? (
              <li className="details__subtitle">
                <p>Color: {(garmetDetail as Garmet).variant.color}</p>
              </li>
            ) : (
              ""
            )}
            {(garmetDetail as Garmet).variant.size ? (
              <li className="details__subtitle">
                <p>Size: {(garmetDetail as Garmet).variant.size}</p>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul>
            <li className="details__review__title">
              <h2>Garmet Reviews</h2>
            </li>
            {(garmetDetail as Garmet).reviews.length
              ? (garmetDetail as Garmet).reviews.map(
                  (rev: Review, index: number) => (
                    // eslint-disable-next-line indent
                    <div key={index}>
                      <li className="details__review__subtitle">
                        <h4>{rev.name}</h4>
                      </li>
                      <li className="details__review__subtitle">
                        <p>{rev.comment}</p>
                      </li>
                    </div>
                  )
                )
              : ""}
          </ul>
        </div>
        <div className="details__item col-1">
          <div className="details__box">
            <ul>
              <li>
                <div className="row">
                  <div className="details__box__label">Price</div>
                  <div className="details__box__price">
                    ${(garmetDetail as Garmet).variant.price}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="details__box__label">Status</div>
                  <div>
                    {(garmetDetail as Garmet).stock > 0 ? (
                      <span className="details__box__inStock">In stock</span>
                    ) : (
                      <span className="details__box__notInStock">
                        Currently unavailable
                      </span>
                    )}
                  </div>
                </div>
              </li>

              {(garmetDetail as Garmet).stock > 0 && user ? (
                <div>
                  <li>
                    <button
                      className="details__box__btn btn--primary btn--block"
                      onClick={() => {
                        dispatch(createCart(garmetId, qty));
                        window.location.assign("/");
                      }}
                    >
                      Add to Cart
                    </button>
                  </li>
                  {errorCreateCart ? (
                    <div className="error">
                      Garmet not added to cart: {errorCreateCart.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
          {user ? (
            <div className="details__box">
              <ReviewCreation garmetId={(garmetDetail as Garmet)._id} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <CartDrawer />
    </div>
  ) : (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default GarmetDetails;
