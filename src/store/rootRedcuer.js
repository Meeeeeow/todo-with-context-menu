import { taskReducer } from "./reducer/addTaskReducer";
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['tasks']
}
const rootReducer = combineReducers({
    tasks: taskReducer
})

export default persistReducer(persistConfig, rootReducer);