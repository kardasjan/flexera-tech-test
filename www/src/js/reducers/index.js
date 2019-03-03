import { PEOPLE_REQUESTED, PEOPLE_LOADED, REQUEST_ADD_PERSON, PERSON_ADDED, REQUEST_DELETE_PERSON, LOAD_PEOPLE_ERROR, ADD_PERSON_FAILED, DELETE_PERSON_FAILED, PERSON_DELETED, INVALID_EMAIL, NAME_REQUIRED, INVALID_AGE, CHECKED_PEOPLE_CHANGED } from "../constants/action-types";

const initialState = {
  people: [],
  checkedPeople: [],
  errors: [],
  loading: false
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    // Fetch People
    case PEOPLE_REQUESTED:
      return { ...state, loading: true }
    case PEOPLE_LOADED:
      return { ...state, people: action.payload, loading: false }
    case LOAD_PEOPLE_ERROR:
      return { ...state, errors: [ ...state.errors, action.payload ] , loading: false }

    // Add Person
    case REQUEST_ADD_PERSON:
      return { ...state, loading: true }
    // It's either this or Middleware used in Delete to update Table of people, I wonder which approach is better
    // MW seems cleaner, also probably won't have to update the component twice... ah, IDK. Too much hassle right now.
    case PERSON_ADDED:
      return { ...state, people: [ ...state.people, action.payload], loading: false } 
    case ADD_PERSON_FAILED:
      return { ...state, errors: [ ...state.errors, action.payload ] , loading: false }
  
    // Remove person
    case REQUEST_DELETE_PERSON:
      return { ...state, loading: true }
    case PERSON_DELETED:
      return { ...state, loading: false }
    case DELETE_PERSON_FAILED:
      return { ...state, errors: [ ...state.errors, action.payload ] , loading: false }

    // Validation errors
    case INVALID_EMAIL:
      return { ...state, errors: [ ...state.errors, action.payload ] }
    case NAME_REQUIRED:
      return { ...state, errors: [ ...state.errors, action.payload ] }
    case INVALID_AGE:
      return { ...state, errors: [ ...state.errors, action.payload ] }
    
    
    // Table
    case CHECKED_PEOPLE_CHANGED:
      return { ...state, checkedPeople: action.payload }
    
    
    default:
      return state
  }
}

export default rootReducer;
