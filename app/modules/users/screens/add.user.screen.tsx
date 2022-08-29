import React, { useEffect, useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import {
    ActivityIndicator,
    FlatList,
    View,
    KeyboardAvoidingView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/actions/users.actions";
import { UserRoles, UsersDto } from "../dtos/users.dto";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "addUser">;
    navigation: StackNavigationProp<ParamList, "addUser">;
};
export const AddUserScreen: React.FC<Props> = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [whatsApp, setWhatsApp] = useState("");
    const [address, setAddress] = useState("");
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const usersState = useSelector(
        (state: ApplicationStateInterface) => state.usersState,
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
            headerRight: () =>
                usersState.addState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 10 }}
                        color={"black"}
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
                                addUser(
                                    new UsersDto(
                                        name,
                                        userName,
                                        password,
                                        mobile,
                                        email,
                                        whatsApp,
                                        UserRoles.admin,
                                        address,
                                    ),
                                ),
                            );
                        }}
                    />
                ),
        });
    });

    const setusername = (username: string) => {
        let uname = username.replace(" ", "");
        setUserName(uname);
    };

    useEffect(() => {
        if (usersState.addState === ActionState.done) {
            navigation.goBack();
        }
    }, [usersState.addState]);

    const rows = [
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
                <ListItem.Subtitle>Name</ListItem.Subtitle>
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
                    placeholder={"User Name"}
                    value={userName}
                    // onChangeText={(value) => setUserName(value)}
                    onChangeText={setusername}
                />
                <ListItem.Subtitle>User Name</ListItem.Subtitle>
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
                    placeholder={"Password"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <ListItem.Subtitle>Password</ListItem.Subtitle>
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
                    placeholder={"mobile"}
                    value={mobile}
                    keyboardType={"phone-pad"}
                    onChangeText={(value) => setMobile(value)}
                />

                <ListItem.Subtitle>Mobile</ListItem.Subtitle>
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
                    placeholder={"+923476083669"}
                    value={whatsApp}
                    onChangeText={(value) => setWhatsApp(value)}
                />
                <ListItem.CheckBox
                    size={20}
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    title={""}
                />
                <ListItem.Subtitle>WhatsApp</ListItem.Subtitle>
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
                    placeholder={"Email"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <ListItem.Subtitle>Email</ListItem.Subtitle>
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
                    placeholder={"Address"}
                    value={address}
                    onChangeText={(value) => setAddress(value)}
                />
                <ListItem.Subtitle>Address</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </KeyboardAvoidingView>
    );
};
