import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import garmetReducer from "./garmetReducer";
import { userReducer } from "./userReducer";

const rootReducer = () =>
  combineReducers({
    cart: cartReducer,
    garmet: garmetReducer,
    user: userReducer,
  });

export default rootReducer;
