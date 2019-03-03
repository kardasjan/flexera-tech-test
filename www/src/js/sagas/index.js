import { put, takeLatest, all, call } from 'redux-saga/effects';
import uuid from "uuid/v4"
import { PEOPLE_REQUESTED, REQUEST_DELETE_PERSON, REQUEST_ADD_PERSON } from '../constants/action-types'
import { peopleLoaded, loadPeopleError, personAdded, personDeleted, addPersonError, deletePersonError } from '../actions'
import * as Api from '../services/api'

function* getPeople(action) {
  try {
    const people = yield call(Api.getPeople, action.payload)
    yield put(peopleLoaded(people))
  }
  catch(e) {
    yield put(loadPeopleError({ id: uuid(), message: e.message }))
  }
}

function* addPerson(action) {
  try {
    const newPerson = yield call(Api.addPerson, action.payload)
    yield put(personAdded(newPerson))
  }
  catch(error) {
    yield put(addPersonError({ id: uuid(), message: error.message }))
  }
}

function* deletePerson(action) {
  try {
    yield call(Api.deletePerson, action.payload)
    yield put(personDeleted())
  }
  catch(error) {
    yield put(deletePersonError({ id: uuid(), message: error.message }))
  }
}

function* actionWatcher() {
  yield takeLatest(PEOPLE_REQUESTED, getPeople)
  yield takeLatest(REQUEST_DELETE_PERSON, deletePerson)
  yield takeLatest(REQUEST_ADD_PERSON, addPerson)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
