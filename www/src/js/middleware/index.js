/* eslint-disable func-names */
import uuid from "uuid/v4"
import { REQUEST_ADD_PERSON, NAME_REQUIRED, INVALID_EMAIL, INVALID_AGE, PERSON_DELETED, PEOPLE_REQUESTED } from "../constants/action-types";

export function validateForm({ dispatch }) {
  return function(next) {
    return function(action) {
      // Email regex
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (action.type === REQUEST_ADD_PERSON) {

        if (action.payload.name.length <= 0) {
          return dispatch({ type: NAME_REQUIRED, payload: { message: "Name is required", id: uuid() } });
        }
        
        if (!re.test(String(action.payload.email).toLowerCase())) {
          return dispatch({ type: INVALID_EMAIL, payload: { message: "Enter valid email address", id: uuid() } });
        }

        if (action.payload.age < 0) {
          return dispatch({ type: INVALID_AGE, payload: { message: "Age must be equal or higher than 0", id: uuid() } });
        }
      }

      return next(action);
    };
  };
}

export function reloadPeople({dispatch}) {
  return function(next) {
    return function(action) {
      if (action.type === PERSON_DELETED) {
        return dispatch({ type: PEOPLE_REQUESTED, payload: { order: "asc", sort: "id" }})
      }
      return next(action)
    }
  }
}
