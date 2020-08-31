import { createStore, combineReducers } from "redux";
import cartReducer from "./cart-reducer"
import authReducer from "./auth-reducer"

let reducers = combineReducers({
    cart: cartReducer,
    auth: authReducer
})

const store = createStore(reducers)

export default store