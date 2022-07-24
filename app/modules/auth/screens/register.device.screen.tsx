import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { registerDevice } from "../redux/actions/auth.actions";
import { Device } from "../../../common/entities/device.entity";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";

type Props = {
    route: RouteProp<ParamList, "register">;
    navigation: StackNavigationProp<ParamList, "register">;
};

export const RegisterDeviceScreen: React.FC<Props> = ({ navigation }) => {
    const authState = useSelector(
        (state: ApplicationStateInterface) => state.authState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            // await messaging().registerDeviceForRemoteMessages();
            const permissionStatus = await messaging().requestPermission();
            console.log("permissionStatus:", permissionStatus);
            let token: string | undefined;
            if (permissionStatus === 1) {
                token = await messaging().getToken();
                console.log("fcm token:", token);
            }
            const device = await Device.toLatest(token);
            dispatch(registerDevice(device));
        })();
    }, []);

    return (
        <View
            style={{
                backgroundColor: "#BCD979",
                justifyContent: "center",
                flex: 1,
            }}
        >
            <ActivityIndicator size={"large"} />
        </View>
    );
};
