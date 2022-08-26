import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { ParamList, SelectCustomerReason } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentDto, PaymentMode } from "../dtos/payment.dto";
import { useDispatch, useSelector } from "react-redux";
import { addPayment, cleanupPayments } from "../redux/actions/payment.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { cleanupNewPayment } from "../redux/actions/new.payment.actions";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "createPayment">;
    navigation: StackNavigationProp<ParamList, "createPayment">;
};

export const CreatePaymentScreen: React.FC<Props> = ({ route, navigation }) => {
    const [amount, setAmount] = useState("0");
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.Cash);
    const [currentIndex, setCurrentIndex] = useState(0);
    const selectCustomerDisable = route.params.selectCustomerDisable;
    const paymentsState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const paymentState = useSelector(
        (state: ApplicationStateInterface) => state.newPaymentState,
    );
    const buttons = ["Cash", "Online"];

    const dispatch = useDispatch();

    const selectPaymentMode = (selected: any) => {
        setCurrentIndex(selected);
        if (selected === 0) {
            setMode(PaymentMode.Cash);
        } else {
            setMode(PaymentMode.Online);
        }
    };
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
                paymentsState.addState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 10 }}
                        color={"black"}
                    />
                ) : (
                    <Icon
                        disabled={
                            paymentState.customer === undefined ||
                            amount === "0"
                        }
                        containerStyle={{ marginRight: 10 }}
                        size={28}
                        name="save"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() =>
                            dispatch(
                                addPayment(
                                    new PaymentDto(
                                        parseInt(amount) || 0,
                                        mode,
                                        paymentState.customer?.id || 0,
                                    ),
                                ),
                            )
                        }
                    />
                ),
        });
    });

    useEffect(() => {
        if (paymentsState.addState === ActionState.done) {
            dispatch(cleanupPayments());
            dispatch(cleanupNewPayment());
            navigation.goBack();
        }
    }, [paymentsState.addState]);

    const rows = [
        // @ts-ignore
        <ListItem
            onPress={() =>
                navigation.navigate("selectCustomer", {
                    selectable: true,
                    reason: SelectCustomerReason.CreatePayment,
                })
            }
            disabled={selectCustomerDisable}
            bottomDivider
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
        >
            <ListItem.Content>
                <ListItem.Title>
                    {paymentState.customer
                        ? paymentState.customer.name
                        : "Not selected"}
                </ListItem.Title>
                <ListItem.Subtitle>Customer</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Title>Rs </ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Amount"}
                    value={amount}
                    keyboardType={"numeric"}
                    onChangeText={(value) => setAmount(value)}
                />
                <ListItem.Subtitle>Amount</ListItem.Subtitle>
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
                    onPress={(selected) => selectPaymentMode(selected)}
                    containerStyle={{ maxWidth: 140 }}
                />
                <ListItem.Title />
                <ListItem.Subtitle>Payment Mode</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
