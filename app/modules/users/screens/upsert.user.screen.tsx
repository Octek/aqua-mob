import React, { useEffect, useState } from "react";
import { Badge, Icon, ListItem } from "react-native-elements";
import { ActivityIndicator, FlatList, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import {
    addUser,
    cleanupUsers,
    refreshUser,
    updateUser,
} from "../redux/actions/users.actions";
import { UserRole, UsersDto } from "../dtos/users.dto";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { CompanyStatus } from "../../../common/entities/company.entity";
import {
    blockUser,
    cleanupUser,
    unblockUser,
} from "../redux/actions/user.actions";

type Props = {
    route: RouteProp<ParamList, "upsertUser">;
    navigation: StackNavigationProp<ParamList, "upsertUser">;
};
export const UpsertUserScreen: React.FC<Props> = ({ route, navigation }) => {
    // const user = route.params.user;

    const [user, setUser] = useState(route.params.user);
    const [name, setName] = useState(user?.name);
    const [userName, setUserName] = useState(user?.username);
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState(user?.mobileWithoutPrefix);
    const [email, setEmail] = useState(user?.email);
    const [whatsApp, setWhatsApp] = useState(user?.whatsAppWithoutPrefix);
    const [address, setAddress] = useState(user?.address);
    const [checked, setChecked] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(
        user != undefined ? user?.role - 1 : 0,
    );
    const [userRole, setUserRole] = useState(
        user === undefined
            ? UserRole.Operator
            : UsersDto.getUserRole(user.role),
    );
    const dispatch = useDispatch();
    const usersState = useSelector(
        (state: ApplicationStateInterface) => state.usersState,
    );
    const userState = useSelector(
        (state: ApplicationStateInterface) => state.userState,
    );
    // const buttons = ["User", "Operator", "Admin", "Super Admin"];
    const buttons = ["Operator", "Admin"];

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                usersState.addState ||
                usersState.updateState ||
                userState.updateState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 25 }}
                        size={32}
                        color={"black"}
                    />
                ) : (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {user !== undefined && (
                            <Icon
                                containerStyle={{ marginRight: 10 }}
                                size={28}
                                name="block"
                                color="black"
                                tvParallaxProperties={undefined}
                                onPress={() => {
                                    if (
                                        user !== undefined &&
                                        user?.status < 0
                                    ) {
                                        dispatch(unblockUser(user?.id!));
                                    } else {
                                        dispatch(blockUser(user?.id!));
                                    }
                                }}
                            />
                        )}
                        <Icon
                            containerStyle={{ marginRight: 10 }}
                            size={28}
                            disabled={checkAllTheFieldsAreNotEmpty()}
                            name="save"
                            color="black"
                            tvParallaxProperties={undefined}
                            onPress={() => {
                                console.log(
                                    "usersSttate=== in onPress",
                                    usersState.addState,
                                    usersState.updateState,
                                );

                                dispatch(
                                    user === undefined
                                        ? addUser(
                                              new UsersDto(
                                                  name || "",
                                                  userName || "",
                                                  password || "",
                                                  mobile || "",
                                                  email || "",
                                                  checked
                                                      ? mobile || ""
                                                      : whatsApp || "",
                                                  userRole || UserRole.Operator,
                                                  address || "",
                                              ),
                                          )
                                        : updateUser(
                                              new UsersDto(
                                                  name || "",
                                                  userName || "",
                                                  password || "",
                                                  mobile || "",
                                                  email || "",
                                                  checked
                                                      ? mobile || ""
                                                      : whatsApp || "",
                                                  userRole || UserRole.Operator,
                                                  address || "",
                                              ),
                                              user.id,
                                          ),
                                );
                            }}
                        />
                    </View>
                ),
        });
    });

    const checkAllTheFieldsAreNotEmpty = () => {
        return (
            name === "" ||
            userName === "" ||
            password === "" ||
            mobile === "" ||
            email === "" ||
            address === ""
        );
    };

    useEffect(() => {
        if (userState.entity) {
            setUser(userState.entity);
        }
    }, [userState.entity]);

    useEffect(() => {
        if (userState.updateState === ActionState.done) {
            dispatch(refreshUser(userState.entity!));
        }
    }, [userState.updateState]);

    useEffect(() => {
        if (usersState.addState === ActionState.done) {
            cleanupUser();
            cleanupUsers();
            navigation.goBack();
        }
    }, [usersState.addState]);

    useEffect(() => {
        if (usersState.updateState === ActionState.done) {
            navigation.goBack();
        }
    }, [usersState.updateState]);

    const selectUserRole = (selected: any) => {
        setCurrentIndex(selected - 1);
        setUserRole(selected);
        // if (selected === 1) {
        //     setUserRole(selected);
        // } else {
        //     setUserRole(UserRole.Admin);
        // }
    };

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
                    disabled={user !== undefined}
                    placeholder={"User Name"}
                    value={userName}
                    onChangeText={(value) => setUserName(value)}
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
                    secureTextEntry={true}
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
                <ListItem.Title>+92</ListItem.Title>
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
                <ListItem.Title>+92</ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"3476083669"}
                    value={checked ? mobile : whatsApp}
                    keyboardType={"phone-pad"}
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

        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <ListItem.ButtonGroup
                    buttons={buttons}
                    selectedIndex={currentIndex}
                    onPress={(selected) => selectUserRole(selected + 1)}
                    containerStyle={{ maxWidth: 140 }}
                />
                <ListItem.Title />
                <ListItem.Subtitle>User Role</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];
    return (
        <View style={{ flex: 1 }}>
            {user?.status === CompanyStatus.blocked && (
                <Badge
                    containerStyle={{ marginVertical: 3, padding: 3 }}
                    badgeStyle={{ backgroundColor: "pink" }}
                    value={"blocked"}
                />
            )}
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
