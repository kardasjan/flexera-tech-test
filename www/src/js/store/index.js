import * as redux from "redux"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import rootReducer from "../reducers/index"
import { validateForm, reloadPeople } from "../middleware/index"
import apiSaga from "../sagas/index"

const initialiseSagaMiddleware = createSagaMiddleware()

// Redux DEV TOOLS
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['checkedPeople']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = redux.createStore(
  persistedReducer,
  storeEnhancers(
    redux.applyMiddleware(validateForm, reloadPeople, initialiseSagaMiddleware)
  )
)
const persistor = persistStore(store)

initialiseSagaMiddleware.run(apiSaga)

export default { store, persistor }
