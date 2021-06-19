import {
  TOGGLE_CART,
  AllCartActions,
  CART_QTY,
  CREATE_CART_ERROR,
  Cart,
  GET_CART_ERROR,
  GET_CART_SUCCESS,
  DELETE_GARMET_CART_ERROR,
  DELETE_CART_ERROR,
  DELETE_CART,
} from "../types/types";

const initialState: InitialState = {
  isOpen: false,
  qty: 1,
  errorCreateCart: null,
  userCart: "",
  errorGetCart: null,
  errorDeleteGarmetCart: null,
  errorDeleteCart: null,
};

export type InitialState = {
  isOpen: boolean;
  qty: number;
  errorCreateCart: Error | null;
  userCart: Cart | string;
  errorGetCart: Error | null;
  errorDeleteGarmetCart: Error | null;
  errorDeleteCart: Error | null;
};

const cartReducer = 