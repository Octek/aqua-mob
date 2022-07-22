import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import axiosMiddleware from "redux-axios-middleware";
import { rootReducer } from "./root.reducer";
import thunk from "redux-thunk";
import { showError } from "./error.actions";
import { useDispatch } from "react-redux";
import { createIconSet } from "react-native-vector-icons";

const client = axios.create({
    baseURL: "https://octek-aqua.herokuapp.com",
    responseType: "json",
});

client.interceptors.request.use(
    async (config: any) => {
        const token = store.getState().authState?.device?.accessToken;
        console.log("token:", token);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        config.validateStatus = (status: number) => {
            console.log("status is:", status);
            return status >= 200 && status < 300;
        };
        console.log("paramsConfig===", config);
        return config;
    },
    async (error: any) => {
        console.log(":e.r.rr.o.r:", error);
    },
);

client.interceptors.response.use(
    (response: any) => {
        console.log("promise fulfilled");
        return response;
    },
    (error: any) => {
        console.log("promise rejected:", error.response.data.message);
        let message = "Unknown Error";
        let code = 0;
        if (error.response.data.message) {
            if (error.response.data.message.reduce) {
                message = error.response.data.message[0];
            } else {
                message = error.response.data.message;
            }
        }
        if (error.response.data.statusCode) {
            code = error.response.data.statusCode;
        }
        store.dispatch(showError(code, message));
        return Promise.reject({ ...error, code: code, message: message });
    },
);

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["authState"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(axiosMiddleware(client, {})),
        applyMiddleware(thunk),
    ),
);
const persistor = persistStore(store);

export { store, persistor };
