import { Dispatch } from "redux";
import axios from "axios";

import {
  FETCH_GARMETS_SUCCESS,
  FETCH_GARMETS_ERROR,
  FETCH_GARMET_DETAILS_SUCCESS,
  FETCH_GARMET_DETAILS_ERROR,
  FILTER_GARMET,
  HANDLE_SEARCH_GARMET,
  CREATE_GARMET_ERROR,
  DELETE_GARMET_ERROR,
  EDIT_GARMET_ERROR,
  AllGarmetsActions,
  Garmet,
} from "../types/types";

export const fetchGarmetsSuccess = (garmets: Garmet[]): AllGarmetsActions => {
  return {
    type: FETCH_GARMETS_SUCCESS,
    payload: garmets,
  };
};

export const fetchGarmetsError = (error: Error | null): AllGarmetsActions => {
  return {
    type: FETCH_GARMETS_ERROR,
    payload: error,
  };
};

export const fetchGarmetDetailsSuccess = (
  garmet: Garmet
): AllGarmetsActions => {
  return {
    type: FETCH_GARMET_DETAILS_SUCCESS,
    payload: garmet,
  };
};

export const fetchGarmetDetailsError = (
  error: Error | null
): AllGarmetsActions => {
  return {
    type: FETCH_GARMET_DETAILS_ERROR,
    payload: error,
  };
};

export const filterGarmet = (garmets: Garmet[]): AllGarmetsActions => {
  return {
    type: FILTER_GARMET,
    payload: garmets,
  };
};

export const handleSearchGarmet = (searchField: string): AllGarmetsActions => {
  return {
    type: HANDLE_SEARCH_GARMET,
    payload: searchField,
  };
};

export const createGarmetError = (error: Error | null): AllGarmetsActions => {
  return {
    type: CREATE_GARMET_ERROR,
    payload: error,
  };
};

export const editGarmetError = (error: Error | null): AllGarmetsActions => {
  return {
    type: EDIT_GARMET_ERROR,
    payload: error,
  };
};

export const deleteGarmetError = (error: Error | null): AllGarmetsActions => {
  return {
    type: DELETE_GARMET_ERROR,
    payload: error,
  };
};

export const fechtGarmets = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(
      "https://the-original-brand.herokuapp.com/api/v1/garmets"
    );
    dispatch(fetchGarmetsSuccess(data));
    dispatch(filterGarmet(data));
  } catch (error) {
    dispatch(fetchGarmetsError(error));
  }
};

export const fetchGarmetsDetails =
  (garmetId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(
        `https://the-original-brand.herokuapp.com/api/v1/garmets/${garmetId}`
      );
      dispatch(fetchGarmetDetailsSuccess(data));
    } catch (error) {
      dispatch(fetchGarmetDetailsError(error));
    }
  };

export const createGarmet = (form: FormData) => (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const token = temp.token;
    axios.post(
      "https://the-original-brand.herokuapp.com/api/v1/garmets",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    dispatch(createGarmetError(error));
  }
};

export const editGarmet =
  (
    name: string,
    description: string,
    category: string,
    stock: number,
    price: number,
    color: string,
    size: string,
    garmetId: string
  ) =>
  (dispatch: Dispatch) => {
    try {
      const temp = JSON.parse(localStorage.getItem("userInfo") as string);
      const token = temp.token;

      axios.put(
        `https://the-original-brand.herokuapp.com/api/v1/garmets/${garmetId}`,
        { name, description, category, stock, price, color, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      dispatch(editGarmetError(error));
    }
  };

export const deleteGarmet = (garmetId: string) => (dispatch: Dispatch) => {
  try {
    const temp = JSON.parse(localStorage.getItem("userInfo") as string);
    const token = temp.token;

    axios.delete(
      `https://the-original-brand.herokuapp.com/api/v1/garmets/${garmetId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch(deleteGarmetError(error));
  }
};

type ReviewInput = {
  name: string;
  comment: string;
  rating: number;
};

export const postReview =
  (garmetId: string, review: ReviewInput) => async (dispatch: Dispatch) => {
    const { name, comment, rating } = review;
    try {
      axios.put(
        `https://the-original-brand.herokuapp.com/api/v1/garmets/review/${garmetId}`,
        {
          name: name,
          comment: comment,
          rating: +rating,
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };
