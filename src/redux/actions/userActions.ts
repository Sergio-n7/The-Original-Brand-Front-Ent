import { Dispatch } from "redux";
import axios from "axios";

import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_EDIT_SUCCESS,
  USER_EDIT_ERROR,
  GET_ALL_USERS,
  User,
  AllUsersActions,
} from "../types/types";

export const signinSuccess = (user: Partial<User>): AllUsersActions => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: user,
  };
};

export const signinError = (error: Error | null): AllUsersActions => {
  return {
    type: USER_SIGNIN_ERROR,
    payload: error,
  };
};

export const UserSignOut = () => {
  return {
    type: USER_SIGNOUT,
  };
};

export const UserRegisterSuccess = (user: User): AllUsersActions => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: user,
  };
};

export const UserRegisterError = (error: Error | null): AllUsersActions => {
  return {
    type: USER_REGISTER_ERROR,
    payload: error,
  };
};

export const userEditSuccess = (user: User): AllUsersActions => {
  return {
    type: USER_EDIT_SUCCESS,
    payload: user,
  };
};

export const userEditError = (error: Error): AllUsersActions => {
  return {
    type: USER_EDIT_ERROR,
    payload: error,
  };
};

export const getAllUsers = (user: User[]): AllUsersActions => {
  return {
    type: GET_ALL_USERS,
    payload: user,
  };
};

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get("/users");
    dispatch(getAllUsers(data));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editUsers =
  (
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.put(`/users/${userId}`, {
        firstName,
        lastName,
        email,
        password,
        isAdmin,
      });
      dispatch(userEditSuccess(data));
    } catch (error) {
      dispatch(userEditError(error));
    }
  };

export const signin =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post("/users/signin", { email, password });
      dispatch(signinSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(signinError(error));
    }
  };

export const register =
  (firstName: string, lastName: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post("/users", {
        firstName,
        lastName,
        email,
        password,
      });
      dispatch(UserRegisterSuccess(data));
      dispatch(signinSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(UserRegisterError(error));
    }
  };

export const signOut = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(UserSignOut());
};
