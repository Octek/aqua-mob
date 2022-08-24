import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import {
    changeUserPassword,
    clearChangePasswordState,
} from "../redux/actions/password.change.actions";
import { ChangePasswordDto } from "../dtos/change.password.dto";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "showProfile">;
    navigation: StackNavigationProp<ParamList, "showProfile">;
};

export const UserPasswordChange: React.FC<Props> = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const dispatch = useDispatch();

    const changePasswordState = useSelector(
        (state: ApplicationStateInterface) => state.changePasswordState,
    );

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackComponent onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Change Password",
            headerRight: () =>
                changePasswordState.updateState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 10 }}
                        color={"white"}
                    />
                ) : (
                    <Icon
                        containerStyle={{ marginRight: 10 }}
                        size={28}
                        name="save"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() => {
                            dispatch(
                                changeUserPassword(
                                    new ChangePasswordDto(
                                        oldPassword,
                                        newPassword,
                                    ),
                                ),
                            );
                        }}
                    />
                ),
        });
    }, []);

    useEffect(() => {
        if (changePasswordState.updateState === ActionState.done) {
            navigation.goBack();
            dispatch(clearChangePasswordState());
        }
    }, [changePasswordState.updateState]);

    let rows = [
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    secureTextEntry={true}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Old Password"}
                    value={oldPassword}
                    onChangeText={(value) => setOldPassword(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    Old Password
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    secureTextEntry={true}
                    textAlign="left"
                    placeholder={"New Password"}
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    New Password
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
