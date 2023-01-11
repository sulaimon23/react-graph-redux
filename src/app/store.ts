import {
    configureStore,
    ThunkAction,
    Action
} from "@reduxjs/toolkit";
import requestReducer from "./services/dataSlice";
import ReduxLogger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// 
// 
const persistConfig = {
    key: 'root',
    storage: storage,
};
const pReducer = persistReducer(persistConfig, requestReducer);

const middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(ReduxLogger);

export const store = configureStore({
    middleware,
    reducer: {
        requestReducer: pReducer,
    },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
