import {
    CREATE_VENUE_REQUEST,
    CREATE_VENUE_SUCCESS,
    CREATE_VENUE_FAIL,
    ALL_VENUE_REQUEST,
    ALL_VENUE_SUCCESS,
    ALL_VENUE_FAIL,
    DELETE_VENUE_REQUEST, // Add the new action type
    DELETE_VENUE_SUCCESS, // Add the new action type
    DELETE_VENUE_FAIL, // Add the new action type
    UPDATE_VENUE_REQUEST, // Add the new action type for updating venue
  UPDATE_VENUE_SUCCESS, // Add the new action type for updating venue
  UPDATE_VENUE_FAIL, // Add the new action type for updating venue
    CLEAR_ERRORS,
  } from "../constants/venueConstants.js";
  import axios from "axios";
  
  // Create Venue
  export const createVenue = (venueData) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_VENUE_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post("/aak/p3/venue/new", venueData, config);
  
      dispatch({ type: CREATE_VENUE_SUCCESS, payload: data.venue });
    } catch (error) {
      dispatch({
        type: CREATE_VENUE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Venues
export const getAllVenues = (keyword="",currentPage=1) => async (dispatch) => {
  try {
    dispatch({ type: ALL_VENUE_REQUEST });

    let link = `/aak/p3/venues?keyword=${keyword}&page=${currentPage}`;
    const { data } = await axios.get(link);

    dispatch({
      type: ALL_VENUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
};

 // Delete Venue
 export const deleteVenue = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_VENUE_REQUEST });

    const { data } = await axios.delete(`/aak/p3/venue/${id}`);

    dispatch({ type: DELETE_VENUE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Venue
export const updateVenue = (id, venueData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VENUE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/aak/p3/venue/${id}`, venueData, config);

    dispatch({ type: UPDATE_VENUE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_VENUE_FAIL,
      payload: error.response.data.message,
    });
  }
};


  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  

  
 