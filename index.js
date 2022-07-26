/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from "./App";
import { name as appName } from "./app.json";
import { getOrderDetails } from './app/modules/orders/redux/actions/order.actions';
import { PushNotificationTypes } from './app/root.container';
import { useDispatch } from 'react-redux';
import messaging from "@react-native-firebase/messaging";
import { store } from './app/common/redux/store';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    if (remoteMessage.data?.type === PushNotificationTypes.NewOrder) {
        store.dispatch(getOrderDetails(parseInt(remoteMessage.data.orderId)));
    }
    return null;
});

AppRegistry.registerComponent(appName, () => App);
