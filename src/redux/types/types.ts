// cart types

export const TOGGLE_CART = "TOGGLE_CART";
export const CART_GARMET_ID = "CART_GARMET_ID";
export const CART_USER_ID = "CART_USER_ID";
export const CART_QTY = "ADD_TO_CART ";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_ERROR = "GET_CART_ERROR";
export const CREATE_CART_ERROR = "CREATE_CART_ERROR";
export const DELETE_GARMET_CART_ERROR = "DELETE_GARMET_CART_ERROR";
export const DELETE_CART = "DELETE_CART";
export const DELETE_CART_ERROR = "DELETE_CART_ERROR";

export type Cart = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  items: [
    {
      qty: number;
      _id: string;
      garmet: {
        variant: {
          price: number;
        };
        _id: string;
        name: string;
        image: string;
      };
    }
  ];
};

type ToggleCart = {
  type: typeof TOGGLE_CART;
  payload: boolean;
};

type AddQty = {
  type: typeof CART_QTY;
  payload: number;
};

type GetCartSuccess = {
  type: typeof GET_CART_SUCCESS;
  payload: Cart;
};

type GetCartError = {
  type: typeof GET_CART_ERROR;
  payload: Error | null;
};

type CreateCartError = {
  type: typeof CREATE_CART_ERROR;
  payload: Error | null;
};
type DeleteGarmetCartError = {
  type: typeof DELETE_GARMET_CART_ERROR;
  payload: Error | null;
};

type DeleteCart = {
  type: typeof DELETE_CART;
};

type DeleteCartError = {
  type: typeof DELETE_CART_ERROR;
  payload: Error | null;
};

export type AllCartActions =
  | ToggleCart
  | AddQty
  | GetCartSuccess
  | GetCartError
  | CreateCartError
  | DeleteGarmetCartError
  | DeleteCart
  | DeleteCartError;
