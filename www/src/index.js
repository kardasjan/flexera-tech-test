import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import store from "./js/store/index"
import App from "./js/components/App"

render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)
