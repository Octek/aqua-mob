import React, { useState } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { store } from "../../../common/redux/store";
import { FlatList, View } from "react-native";

export const UserProfileScreen = () => {
    const loginUser = store.getState().authState?.loggedInUser;
    const [name, setName] = useState(loginUser?.name || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(loginUser?.email || "");
    const [mobile, setMobile] = useState(loginUser?.mobile || "");
    const [whatsApp, setWhatsApp] = useState(loginUser?.whatsApp || "");

    const initials = () => {
        const components = loginUser!.name.split(" ");
        if (components.length === 1) {
            return loginUser!.name.substring(0, 2);
        } else if (components.length >= 2) {
            return components[0][0] + components[1][0];
        }
        return "";
    };

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
                    size={60}
                    rounded
                    containerStyle={{ backgroundColor: "red" }}
                    title={initials()}
                />
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider onPress={() => console.log(initials())}>
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
                    placeholder={"password"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
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
