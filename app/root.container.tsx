import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppState, Linking, StatusBar, View } from "react-native";
import { enableScreens } from "react-native-screens";
// import messaging from "@react-native-firebase/messaging";
// import { URL, URLSearchParams } from "react-native-url-polyfill";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "./common/redux/application.state.interface";
import { ActionState } from "./common/redux/entity.state.interface";
import { AuthNavigator } from "./modules/auth/screens/auth.navigator";
import { navigationRef, replace } from "./common/root.navigation";
import { showMessage } from "react-native-flash-message";
import { clearError } from "./common/redux/error.actions";
import { HomeNavigator } from "./modules/home/screens/home.navigator";
import { unauthorize } from "./modules/auth/redux/actions/auth.actions";
import { OrdersNavigator } from "./modules/orders/screens/orders.navigator";
import { PaymentNavigator } from "./modules/payments/screens/payments.navigator";
import { CustomersNavigator } from "./modules/customers/screens/customers.navigator";
import { ProductsNavigator } from "./modules/products/screens/products.navigator";

enableScreens();

const Stack = createStackNavigator();

export const RootContainer = () => {
    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState);
    const authState = useSelector(
        (state: ApplicationStateInterface) => state.authState,
    );
    const errorState = useSelector(
        (state: ApplicationStateInterface) => state.errorState,
    );
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (errorState.code === 401) {
            dispatch(unauthorize());
            replace("auth", {});
        }
        if (errorState.message) {
            showMessage({ message: errorState.message });
            dispatch(clearError());
        }
    }, [errorState.message]);

    useEffect(() => {
        if (authState.deviceState === ActionState.done) {
            if (authState.loggedInUser) {
                replace("homeNavigator", {});
            } else {
                replace("authNavigator", { screen: "login" });
            }
        }
    }, [authState.deviceState, authState.authState]);

    // useEffect(() => {
    //     if (authState.loggedInUser) {
    //         replace("homeNavigator", {});
    //     } else {
    //         replace("authNavigator", { screen: "login" });
    //     }
    // }, [authState.authState]);

    // useEffect(() => {
    //     // dispatch(resetError());
    // }, []);
    //
    // useEffect(() => {
    //     console.log("deviceState:", authState.deviceState);
    //     if (authState.deviceState === ActionState.done) {
    //         replace("login");
    //     }
    // }, [authState.deviceState]);
    //
    //
    // useEffect(() => {
    //     const subscription = Linking.addEventListener("url", (url) => {
    //         console.log("11111", url?.url);
    //         setUrl("");
    //         setUrl(url?.url);
    //     });
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);
    //
    // useEffect(() => {
    //     (async () => {
    //         const localUrl = await Linking.getInitialURL();
    //         setUrl(localUrl || "");
    //     })();
    // }, []);
    //
    // useEffect(() => {
    //     if (url !== "") {
    //         console.log("checking if authorized ...");
    //         checkIfAuthorized();
    //     }
    // }, [url]);
    //
    // useEffect(() => {
    //     if (!authState.fetchingMe) {
    //         if (authState.error === undefined && authState.mobileVerified) {
    //             if (url !== "") {
    //                 console.log("here twice");
    //                 openDeepLink(url);
    //                 //setUrl("");
    //             }
    //         }
    //         if (
    //             authState.error?.code === 401 ||
    //             authState.error?.code === 403
    //         ) {
    //             if (url !== "") {
    //                 // dispatch(logoutLight());
    //                 const urlObj = new URL(url);
    //                 const params = new URLSearchParams(urlObj.search);
    //                 if (
    //                     urlObj.pathname === "/payment" ||
    //                     urlObj.pathname === "/mobile_change" ||
    //                     urlObj.pathname === "/card_lost"
    //                 ) {
    //                     // navigate("auth", {
    //                     //     screen: "authenticate",
    //                     //     params: {
    //                     //         uuid: params.get("uuid") || "",
    //                     //         type: urlObj.pathname.replace("/", ""),
    //                     //         data: Object.fromEntries([...params]),
    //                     //     },
    //                     // });
    //                 }
    //             }
    //         }
    //     }
    // }, [authState.fetchingMe, authState, authState.error, dispatch, url]);
    //
    // const checkIfAuthorized = () => {
    //     // dispatch(me());
    // };
    //
    // const openDeepLink = (localUrl: any) => {
    //     console.log("openDeepLink");
    //     if (localUrl) {
    //         const urlObj = new URL(localUrl);
    //         const params = new URLSearchParams(urlObj.search);
    //         if (
    //             urlObj.pathname === "/payment" ||
    //             urlObj.pathname === "/mobile_change" ||
    //             urlObj.pathname === "/card_lost"
    //         ) {
    //             // replace("mainDrawer", {
    //             //     screen: "transactionsNavigator",
    //             //     params: {
    //             //         initial: false,
    //             //         screen: "newTransaction",
    //             //         params: {
    //             //             uuid: params.get("uuid") || "",
    //             //             type: urlObj.pathname.replace("/", ""),
    //             //             data: Object.fromEntries([...params]),
    //             //         },
    //             //     },
    //             // });
    //         }
    //     }
    // };
    //
    // useEffect(() => {
    //     return messaging().onMessage(async (message) => {
    //         await Linking.openURL(`https://wa.me/${message.data?.number}`);
    //     });
    // }, []);
    //
    // useEffect(() => {
    //     return messaging().onNotificationOpenedApp(async (message) => {
    //         await Linking.openURL(
    //             `https://wa.me/${message.data?.number}?text=${message.data?.subject}`,
    //         );
    //     });
    // }, []);
    //
    // useEffect(() => {
    //     const subscription = AppState.addEventListener(
    //         "change",
    //         (nextAppState) => {
    //             if (
    //                 appState.current.match(/active/) &&
    //                 nextAppState === "active"
    //             ) {
    //                 console.log("App has come to the foreground!");
    //             }
    //         },
    //     );
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar translucent backgroundColor="transparent" />
            <Stack.Navigator
                initialRouteName={"authNavigator"}
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="authNavigator" component={AuthNavigator} />
                <Stack.Screen name="homeNavigator" component={HomeNavigator} />
                <Stack.Screen
                    name="productsNavigator"
                    component={ProductsNavigator}
                />
                <Stack.Screen
                    name="ordersNavigator"
                    component={OrdersNavigator}
                />
                 <Stack.Screen
                    name="paymentNavigator"
                    component={PaymentNavigator}
                />
                <Stack.Screen
                    name="customersNavigator"
                    component={CustomersNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
