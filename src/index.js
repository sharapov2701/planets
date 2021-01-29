import "core-js/features/map"
import "core-js/features/set"
import React from "react"
import ReactDOM from "react-dom"
import bridge from "@vkontakte/vk-bridge"
import App from "./App"

import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/rootReducer'
import './styles/index.scss'

// Init VK  Mini App
bridge.send("VKWebAppInit")

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}) //runtime download
}
