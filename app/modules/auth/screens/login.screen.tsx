import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    ActivityIndicator,
    ImageBackground,
    TextInput,
    View,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { login } from "../redux/actions/auth.actions";
import { LoginDto } from "../dtos/login.dto";

type Props = {
    route: RouteProp<ParamList, "login">;
    navigation: StackNavigationProp<ParamList, "login">;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const authState = useSelector(
        (state: ApplicationStateInterface) => state.authState,
    );
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const requestLogin = () => {
        const loginDto = new LoginDto(username, password);
        dispatch(login(loginDto));
    };

    return (
        <View
            style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ImageBackground
                source={require("../../../resources/images/login-background.jpg")}
                style={{
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                }}
            />
            <View
                style={{
                    flex: 1,
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: "white",
                        paddingLeft: 5,
                        marginHorizontal: 20,
                        marginVertical: 5,
                        height: 50,
                        borderRadius: 5,
                    }}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    editable={authState.authState !== ActionState.inProgress}
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    placeholder={"Username"}
                />
                <TextInput
                    style={{
                        backgroundColor: "white",
                        paddingLeft: 5,
                        marginHorizontal: 20,
                        marginVertical: 5,
                        height: 50,
                        borderRadius: 5,
                    }}
                    editable={authState.authState !== ActionState.inProgress}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder={"Password"}
                />
                <Button
                    title={
                        authState.authState === ActionState.inProgress ? (
                            <ActivityIndicator size={"small"} />
                        ) : (
                            "Login"
                        )
                    }
                    disabled={
                        authState.authState === ActionState.inProgress ||
                        username.length === 0 ||
                        password.length === 0
                    }
                    containerStyle={{ marginVertical: 5, marginHorizontal: 20 }}
                    titleStyle={{ color: "black" }}
                    buttonStyle={{ backgroundColor: "#cadcf0", height: 50 }}
                    onPress={() => requestLogin()}
                />
            </View>
        </View>
    );
};
