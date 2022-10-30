import {applyMiddleware, combineReducers} from "redux";
import {counterReducer} from "./counter-reducer";
import thunk from "redux-thunk";
import { legacy_createStore as createStore} from 'redux'
import {loadState, saveState} from "../utils/localStorage-utils";
const rootReducer = combineReducers({
    counter: counterReducer,
})
let preloadedState;

const persistedTodoString = localStorage.getItem('app-state')
if (persistedTodoString) {
    preloadedState=JSON.parse(persistedTodoString)
}
const persistedState = loadState(); // подгружаем значение с localStorage

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))


export type AppRootStateType = ReturnType<typeof rootReducer>

store.subscribe(()=>{
    saveState({
        counter: store.getState().counter // подписываемся  на каждое изменение state и записываем значение counter
    });
})
// @ts-ignore
window.store = store;