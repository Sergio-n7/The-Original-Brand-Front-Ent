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

// Garmet types
export const FETCH_GARMETS_SUCCESS = "FETCH_GARMETS_SUCCES";
export const FETCH_GARMETS_ERROR = "FETCH_GARMETS_ERROR";
export const FETCH_GARMET_DETAILS_SUCCESS = "FETCH_GARMETS_DETAILS_SUCCESS";
export const FETCH_GARMET_DETAILS_ERROR = "FETCH_GARMETS_DETAILS_ERROR";
export const CREATE_GARMET_ERROR = "CREATE_GARMET_ERROR";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const FILTER_GARMET = "FILTER_GARMET";
export const HANDLE_SEARCH_GARMET = "HANDLE_SEARCH_GARMET";
export const EDIT_GARMET_ERROR = "EDIT_GARMET_ERROR";
export const DELETE_GARMET_ERROR = "DELETE_GARMET_ERROR";

export type CreateGarmet = {
  name: string;
  description: string;
  category: string;
  stock: number;
  price: number;
  color?: string;
  size?: string;
  image: string;
};

export type Review = {
  name: string;
  comment: string;
  rating: number;
};

export type Garmet = {
  _id: string;
  name: string;
  description: string;
  category: string;
  stock: number;
  variant: {
    price: number;
    color: string;
    size: string;
  };
  image: string;
  totalRating: number;
  reviews: Review[];
};

export type User = {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  token: string;
  password?: string;
};

export type FetchStatus = {
  status: number;
  statusText: string;
};

type FetchGarmetsSucces = {
  type: typeof FETCH_GARMETS_SUCCESS;
  payload: Garmet[];
};

type FetchGarmetsError = {
  type: typeof FETCH_GARMETS_ERROR;
  payload: Error | null;
};

type CreateGarmetError = {
  type: typeof CREATE_GARMET_ERROR;
  payload: Error | null;
};

type FetchGarmetDetailsSucces = {
  type: typeof FETCH_GARMET_DETAILS_SUCCESS;
  payload: Garmet;
};

type FetchGarmetDetailsError = {
  type: typeof FETCH_GARMET_DETAILS_ERROR;
  payload: Error | null;
};

type FilterGarmet = {
  type: typeof FILTER_GARMET;
  payload: Garmet[];
};

type HandleSearchGarmet = {
  type: typeof HANDLE_SEARCH_GARMET;
  payload: String;
};

type CreateReview = {
  type: typeof CREATE_REVIEW;
  payload: Review;
};

type EditGarmet = {
  type: typeof EDIT_GARMET_ERROR;
  payload: Error | null;
};

type DeleteGarmetError = {
  type: typeof DELETE_GARMET_ERROR;
  payload: Error | null;
};

export type AllGarmetsActions =
  | FetchGarmetsSucces
  | FetchGarmetsError
  | CreateGarmetError
  | FetchGarmetDetailsSucces
  | FetchGarmetDetailsError
  | FilterGarmet
  | HandleSearchGarmet
  | CreateReview
  | EditGarmet
  | DeleteGarmetError;

// User types
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_ERROR = "USER_SIGNIN_ERROR";
export const USER_SIGNOUT = "USER_SIGNOUT ";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const GET_ALL_USERS = "GET_ALL_USERS ";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS ";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR ";

type getAllUsers = {
  type: typeof GET_ALL_USERS;
  payload: User[];
};

type editUserSuccess = {
  type: typeof USER_EDIT_SUCCESS;
  payload: User;
};

type editUserError = {
  type: typeof USER_EDIT_ERROR;
  payload: Error | null;
};

type signinSuccess = {
  type: typeof USER_SIGNIN_SUCCESS;
  payload: Partial<User>;
};

type signinError = {
  type: typeof USER_SIGNIN_ERROR;
  payload: Error | null;
};

type userSignout = {
  type: typeof USER_SIGNOUT;
};

type registerSuccess = {
  type: typeof USER_REGISTER_SUCCESS;
  payload: User;
};

type registerError = {
  type: typeof USER_REGISTER_ERROR;
  payload: Error | null;
};

export type AllUsersActions =
  | signinSuccess
  | signinError
  | userSignout
  | registerSuccess
  | getAllUsers
  | editUserSuccess
  | editUserError
  | registerError;

// App state types
export type AppState = {
  cart: {
    isOpen: boolean;
    qty: number;
    errorCreateCart: Error | null;
    userCart: string | Cart;
    errorGetCart: Error | null;
    errorDeleteGarmetCart: Error | null;
    errorDeleteCart: Error | null;
  };
  garmet: {
    garmets: Garmet[];
    filteredGarmets: Garmet[];
    searchField: string;
    error: Error | null;
    garmetDetail: Garmet | string;
    errorDetail: Error | null;
    errorCreateGarmet: Error | null;
    errorEditGarmet: Error | null;
    errorDeleteGarmet: Error | null;
  };
  user: {
    user: User | Partial<User> | null;
    errorSignin: Error | null;
    errorRegister: Error | null;
    allUsers: User[];
    errorEditUser: Error | null;
  };
};
