import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { Badge, Icon, ListItem } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { StaticListItemComponent } from "../../../common/components/static.list.item.component";
import {
    ActivityIndicator,
    FlatList,
    View,
    Linking,
    Platform,
} from "react-native";
import { cleanCustomerPayments } from "../redux/actions/customer.payment.action";
import { User } from "../../../common/entities/user.entity";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import {
    blockCustomer,
    unblockCustomer,
} from "../redux/actions/customer.actions";
import { refreshCustomer } from "../redux/actions/customers.actions";
import { CompanyStatus } from "../../../common/entities/company.entity";
import { cleanupCustomerOrders } from "../redux/actions/customer.order.actions";
import { cleanupOrders } from "../../orders/redux/actions/order.actions";
import { showMessage } from "react-native-flash-message";

type Props = {
    route: RouteProp<ParamList, "showCustomer">;
    navigation: StackNavigationProp<ParamList, "showCustomer">;
};

export const ShowCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const customerState = useSelector(
        (state: ApplicationStateInterface) => state.customerState,
    );

    const openCallDialogWithMobileNumber = (number: number) => {
        let phoneNumber = "";
        if (Platform.OS === "android") {
            phoneNumber = `tel:+${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    };

    const openMailBox = (email: string, description: string) => {
        Linking.openURL(`mailto:${email}?subject=SendMail&body=${description}`);
    };

    const openWhatsAppChat = (whatsApp: number, message: string) => {
        let url = `whatsapp://send?text=${message}&phone=${whatsApp}`;
        if (Platform.OS === "android") {
            Linking.canOpenURL(url)
                .then((supported) => {
                    if (!supported) {
                        console.log("Can't handle url: " + url);

                        showMessage({
                            message: "Make sure WhatsApp is installed",
                        });
                    } else {
                        return Linking.openURL(url);
                    }
                })
                .catch((err) => {
                    showMessage({
                        message: "An error occurred" + err,
                    });
                });
        } else {
            Linking.openURL(url);
        }
    };

    const [customer, setCustomer] = useState<User>(route.params.customer);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                customerState.updateState == ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 25 }}
                        size={40}
                        color={"white"}
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
                        <Icon
                            containerStyle={{ marginRight: 10 }}
                            size={28}
                            name="block"
                            color="black"
                            tvParallaxProperties={undefined}
                            onPress={() => {
                                if (customer.status < 0) {
                                    dispatch(unblockCustomer(customer.id));
                                } else {
                                    dispatch(blockCustomer(customer.id));
                                }
                            }}
                        />
                        <Icon
                            containerStyle={{ marginRight: 10 }}
                            size={28}
                            name="edit"
                            color="black"
                            tvParallaxProperties={undefined}
                            onPress={() => {
                                navigation.push("upsertCustomer", {
                                    customer: customer,
                                });
                            }}
                        />
                    </View>
                ),
        });
    });

    useEffect(() => {
        if (customerState.entity) {
            setCustomer(customerState.entity);
        }
    }, [customerState.entity]);

    useEffect(() => {
        if (customerState.updateState === ActionState.done) {
            dispatch(refreshCustomer(customerState.entity!));
        }
    }, [customerState.updateState]);

    const rows = [
        <StaticListItemComponent
            title="Name"
            value={customer.name}
            showChevron={false}
        />,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                openCallDialogWithMobileNumber(Number(customer.mobile));
            }}
        >
            <ListItem.Content>
                <ListItem.Title>
                    {customer.mobile || "Not Available"}
                </ListItem.Title>
                <ListItem.Subtitle>Mobile</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                customer.whatsApp !== "" &&
                    customer.whatsApp !== undefined &&
                    openWhatsAppChat(
                        Number(customer.whatsApp),
                        "this is dummy message",
                    );
            }}
        >
            <ListItem.Content>
                <ListItem.Title>
                    {customer.whatsApp || "Not Available"}
                </ListItem.Title>
                <ListItem.Subtitle>WhatsApp</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignoree
        <ListItem
            bottomDivider
            onPress={() => {
                openMailBox(
                    customer.email,
                    "this is the dummy description for email",
                );
            }}
        >
            <ListItem.Content>
                <ListItem.Title>
                    {customer.email || "Not Available"}
                </ListItem.Title>
                <ListItem.Subtitle>Email</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,

        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                dispatch(cleanupOrders());
                dispatch(cleanupCustomerOrders());
                navigation.navigate("customerOrders", {
                    customer: customer,
                });
            }}
        >
            <ListItem.Content>
                <ListItem.Title>Orders</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                dispatch(cleanCustomerPayments());
                navigation.push("customerPayments", {
                    customer: customer,
                });
            }}
        >
            <ListItem.Content>
                <ListItem.Title>Payments</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() => {
                navigation.push("showLedger", {
                    customer: customer,
                });
            }}
        >
            <ListItem.Content>
                <ListItem.Title>Show Ledger</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            {customer.status == CompanyStatus.blocked && (
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
