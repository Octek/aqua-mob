import React, { useEffect, useState } from "react";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { store } from "../../../common/redux/store";
import { ActivityIndicator, FlatList, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { UserProfileDto } from "../dtos/user.profile.dto";
import { updateUserProfile } from "../redux/actions/user.profile.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";
import {
    clearLoginState,
    updateLoginUser,
} from "../../auth/redux/actions/auth.actions";

type Props = {
    route: RouteProp<ParamList, "showProfile">;
    navigation: StackNavigationProp<ParamList, "showProfile">;
};

export const UserProfileScreen: React.FC<Props> = ({ navigation }) => {
    const loginUser = store.getState().authState?.loggedInUser;
    const [name, setName] = useState(loginUser?.name || "");
    const [email, setEmail] = useState(loginUser?.email || "");
    const [mobile, setMobile] = useState(loginUser?.mobile.substring(3) || "");
    const [whatsApp, setWhatsApp] = useState(
        loginUser?.whatsApp.substring(3) || "",
    );
    const [nameInit, setNameInit] = useState("");
    const dispatch = useDispatch();

    const userProfileState = useSelector(
        (state: ApplicationStateInterface) => state.userProfileReducer,
    );
    const authState = useSelector(
        (state: ApplicationStateInterface) => state.authState,
    );

    useEffect(() => {
        navigation.setOptions({
            // headerTitle: "",
            headerRight: () =>
                userProfileState.updateState == ActionState.inProgress ? (
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
                                updateUserProfile(
                                    new UserProfileDto(name),
                                    loginUser?.id!,
                                ),
                            );
                        }}
                    />
                ),
        });
    });

    const initials = () => {
        const components = loginUser!.name.split(" ");
        if (components.length === 1) {
            const nameInitials = loginUser!.name.substring(0, 2);
            setNameInit(nameInitials);
            return nameInitials;
        } else if (components.length >= 2) {
            const nameInitials = components[0][0] + components[1][0];
            setNameInit(nameInitials);
            return nameInitials;
        }
        return "";
    };
    useEffect(() => {
        initials();
    }, []);

    useEffect(() => {
        if (userProfileState.updateState === ActionState.done) {
            dispatch(updateLoginUser(userProfileState.entity!));
            // initials();
        }
    }, [userProfileState.updateState]);

    useEffect(() => {
        if (authState.updateState === ActionState.done) {
            // dispatch(updateLoginUser(userProfileState.entity!));
            initials();
            dispatch(clearLoginState());
        }
    }, [authState.updateState]);

    let rows = [
        // @ts-ignore
        <ListItem>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    margin: 0,
                    flexDirection: "row",
                }}
            >
                <Avatar
                    size={80}
                    rounded
                    containerStyle={{ backgroundColor: "red" }}
                    // title={initials()}
                    title={nameInit}
                />
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
                    textAlign="left"
                    placeholder={"Name"}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    Name
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                navigation.push("changePassword");
            }}
        >
            <ListItem.Content
                style={{
                    // alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    // paddingLeft: "10",
                }}
            >
                <ListItem.Title style={{ paddingLeft: 10 }}>
                    Change Password
                </ListItem.Title>

                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    Password
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
                    disabled={true}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"email"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    Email
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
                <ListItem.Title>+92</ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    disabled={true}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Mobile"}
                    value={mobile}
                    onChangeText={(value) => setMobile(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    Mobile
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
                <ListItem.Title>+92</ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    disabled={true}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"WhatsAPP"}
                    value={whatsApp}
                    onChangeText={(value) => setWhatsApp(value)}
                />
                <ListItem.Subtitle style={{ paddingLeft: 5 }}>
                    WhatsApp
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
