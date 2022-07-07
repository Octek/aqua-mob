import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { RootContainer } from "./app/root.container";
import { persistor, store } from "./app/common/redux/store";

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <RootContainer />
                <FlashMessage position="bottom" />
            </PersistGate>
        </Provider>
    );
};

export default App;
