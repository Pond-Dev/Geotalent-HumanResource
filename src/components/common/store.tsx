import { createStore } from "redux";
import AuthReducer from "../reducer/AuthReducer";
import { composeWithDevTools } from "redux-devtools-extension";
//connect redux dev tools

const store = createStore(AuthReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
