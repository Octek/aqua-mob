import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentItemDto, PaymentMode } from "../dtos/payment.item.dto";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../redux/actions/payment.action";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";

type Props = {
    route: RouteProp<ParamList, "createPayments">;
    navigation: StackNavigationProp<ParamList, "createPayments">;
};

export const PaymentsCreateScreen: React.FC<Props> = ({ navigation }) => {
    const [amount, setAmount] = useState("0");
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.Cash);
    const [currentIndex, setCurrentIndex] = useState(0);
    const paymentsState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const buttons = ["Cash", "Online"];

    const dispatch = useDispatch();

    const selectPaymetMode = (selected: any) => {
        setCurrentIndex(selected);
        if (selected == 0) {
            setMode(PaymentMode.Cash);
        } else {
            setMode(PaymentMode.Online);
        }
    };

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
                        style={{ marginRight: 10 }}
                        size={28}
                        name="save"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() =>
                            dispatch(
                                addPayment(
                                    new PaymentItemDto(
                                        parseInt(amount) || 0,
                                        mode,
                                        22,
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
            navigation.goBack();
        }
    }, [paymentsState.addState]);

    const rows = [
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
                    onPress={(selected) => selectPaymetMode(selected)}
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
