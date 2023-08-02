import {
    ALL_VENUE_REQUEST,
    ALL_VENUE_SUCCESS,
    ALL_VENUE_FAIL,
    DELETE_VENUE_REQUEST,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_FAIL,
    UPDATE_VENUE_REQUEST, // Add the new action type for updating venue
  UPDATE_VENUE_SUCCESS, // Add the new action type for updating venue
  UPDATE_VENUE_FAIL, // Add the new action type for updating venue
  
    CLEAR_ERRORS,
  } from '../constants/venueConstants';
  
  export const venueReducer = (state = { venues: [] }, action) => {
    switch (action.type) {
      case ALL_VENUE_REQUEST:
        return {
          loading: true,
          venues: [],
        };
      case ALL_VENUE_SUCCESS:
        return {
          loading: false,
          venues: action.payload.venues,
          venuesCount: action.payload.venuesCount,
          resultPerPage: action.payload.resultPerPage,
          filteredVenuesCount: action.payload.filteredVenuesCount,
        };
      case ALL_VENUE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
        case DELETE_VENUE_REQUEST:
          return {
            ...state,
            loading: true, // Set the loading state to true before making the API request
          };


          case DELETE_VENUE_SUCCESS:
            return {
              ...state,
              loading: false,
              venues: state.venues.filter((venue) => venue._id !== action.payload),
            };
          case DELETE_VENUE_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
          case UPDATE_VENUE_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case UPDATE_VENUE_SUCCESS:
            return {
              ...state,
              loading: false,
              success: true,
            };
          case UPDATE_VENUE_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  