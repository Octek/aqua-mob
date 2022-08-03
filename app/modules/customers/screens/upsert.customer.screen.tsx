import React, { useEffect, useState } from "react";
import { ParamList } from "../../../common/param.list";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, ListItem, CheckBox } from "react-native-elements";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    addCustomer,
    cleanupCustomers,
    updateCustomer,
} from "../redux/actions/customers.actions";
import { AddCustomerDto } from "../dtos/add.customer.dto";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { UpdateCustomerDto } from "../dtos/update.customer.dto";

type Props = {
    route: RouteProp<ParamList, "upsertCustomer">;
    navigation: StackNavigationProp<ParamList, "upsertCustomer">;
};

export const UpsertCustomerScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    const customer = route.params.customer;
    const [name, setName] = useState(customer?.name);
    const [mobile, setMobile] = useState(customer?.mobileWithoutPrefix);
    const [address, setAddress] = useState(customer?.address);
    const [email, setEmail] = useState(customer?.email);
    const [whatsApp, setWhatsApp] = useState(customer?.whatsAppWithoutPrefix);
    const [checked, setChecked] = useState(false);
    const customersState = useSelector(
        (state: ApplicationStateInterface) => state.customersState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                customersState.addState === ActionState.inProgress ||
                customersState.updateState === ActionState.inProgress ? (
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
                            console.log("customer:", customer);
                            customer === undefined
                                ? dispatch(
                                      addCustomer(
                                          new AddCustomerDto(
                                              name || "",
                                              mobile || "",
                                              checked
                                                  ? mobile || ""
                                                  : whatsApp || "",
                                              email || "",
                                              address || "",
                                          ),
                                      ),
                                  )
                                : dispatch(
                                      updateCustomer(
                                          customer.id,
                                          new UpdateCustomerDto(
                                              name || "",
                                              mobile || "",
                                              checked
                                                  ? mobile || ""
                                                  : whatsApp || "",
                                              email || "",
                                              address || "",
                                          ),
                                      ),
                                  );
                        }}
                    />
                ),
        });
    });

    useEffect(() => {
        if (
            customersState.addState === ActionState.done ||
            customersState.updateState === ActionState.done
        ) {
            dispatch(cleanupCustomers());
            navigation.goBack();
        }
    }, [customersState.addState, customersState.updateState]);

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
                    autoCorrect={false}
                    autoCompleteType={"none"}
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
                <ListItem.Title>+92</ListItem.Title>
                <ListItem.Input
                    keyboardType={"phone-pad"}
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"3339666222"}
                    value={mobile}
                    maxLength={10}
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
                    keyboardType={"phone-pad"}
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"3339666222"}
                    value={checked ? mobile : whatsApp}
                    maxLength={10}
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
                    autoCompleteType={"none"}
                    autoCorrect={false}
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
                    autoCompleteType={"none"}
                    autoCorrect={false}
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
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
