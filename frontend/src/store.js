import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducers";
import { userReducer } from "./reducers/userReducer";
import { venueReducer } from "./reducers/venueReducer";
// import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
  user : userReducer,
  venue : venueReducer
});

let initialState = {};

const middleware = [thunk];

const store = configureStore(
    {reducer},
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;