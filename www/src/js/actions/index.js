import { PEOPLE_REQUESTED, REQUEST_DELETE_PERSON, REQUEST_ADD_PERSON, PEOPLE_LOADED, LOAD_PEOPLE_ERROR, PERSON_ADDED, ADD_PERSON_FAILED, PERSON_DELETED, DELETE_PERSON_FAILED, CHECKED_PEOPLE_CHANGED } from "../constants/action-types";

export const getPeople = (order, sort) => ({ type: PEOPLE_REQUESTED, payload: { order, sort }})
export const peopleLoaded = (people) => ({ type: PEOPLE_LOADED, payload: people })
export const loadPeopleError = (error) => ({ type: LOAD_PEOPLE_ERROR, payload: error })

export const addPerson = (person) => ({ type: REQUEST_ADD_PERSON, payload: person })
export const personAdded = (person) => ({ type: PERSON_ADDED, payload: person })
export const addPersonError = (error) => ({ type: ADD_PERSON_FAILED, payload: error }) 

export const deletePerson = (id) => ({ type: REQUEST_DELETE_PERSON, payload: { id }})
export const personDeleted = () => ({ type: PERSON_DELETED })
export const deletePersonError = (error) => ({ type: DELETE_PERSON_FAILED, payload: error })

export const checkPerson = (checkedPeople) => ({ type: CHECKED_PEOPLE_CHANGED, payload: checkedPeople })
