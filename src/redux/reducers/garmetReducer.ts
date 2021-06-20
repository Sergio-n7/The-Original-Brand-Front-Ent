import {
  FETCH_GARMETS_SUCCESS,
  FETCH_GARMETS_ERROR,
  FETCH_GARMET_DETAILS_SUCCESS,
  FETCH_GARMET_DETAILS_ERROR,
  FILTER_GARMET,
  CREATE_GARMET_ERROR,
  DELETE_GARMET_ERROR,
  AllGarmetsActions,
  Garmet,
  HANDLE_SEARCH_GARMET,
  EDIT_GARMET_ERROR,
} from "../types/types";

type InitialState = {
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

const initialState: InitialState = {
  garmets: [],
  filteredGarmets: [],
  searchField: "",
  error: null,
  garmetDetail: "",
  errorDetail: null,
  errorCreateGarmet: null,
  errorEditGarmet: null,
  errorDeleteGarmet: null,
};

const garmetReducer = (
  state = initialState,
  action: AllGarmetsActions
): InitialState => {
  switch (action.type) {
    case FETCH_GARMETS_SUCCESS:
      return {
        ...state,
        garmets: action.payload,
      };
    case FETCH_GARMETS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_GARMET_DETAILS_SUCCESS:
      return {
        ...state,
        garmetDetail: action.payload,
      };
    case FETCH_GARMET_DETAILS_ERROR:
      return {
        ...state,
        errorDetail: action.payload,
      };
    case FILTER_GARMET:
      return {
        ...state,
        filteredGarmets: action.payload,
      };
    case CREATE_GARMET_ERROR:
      return {
        ...state,
        errorCreateGarmet: action.payload,
      };
    case EDIT_GARMET_ERROR:
      return {
        ...state,
        errorEditGarmet: action.payload,
      };
    case DELETE_GARMET_ERROR:
      return {
        ...state,
        errorDeleteGarmet: action.payload,
      };
    case HANDLE_SEARCH_GARMET:
      return {
        ...state,
        searchField: "",
        filteredGarmets: state.garmets.filter((garmet: Garmet) =>
          garmet.name
            .toLowerCase()
            .trim()
            .includes(action.payload.toLocaleLowerCase().trim())
        ),
      };
    default:
      return state;
  }
};
export default garmetReducer;
