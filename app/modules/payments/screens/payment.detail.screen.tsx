import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SectionList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";

import { StaticListItemComponent } from "../../../common/components/static.list.item.component";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { Badge, Icon } from "react-native-elements";
import { reversePayment } from "../redux/actions/payment.actions";
import { ReactNativeModal } from "react-native-modal";
import { cancelOrder } from "../../orders/redux/actions/order.actions";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "showPaymentDetail">;
    navigation: StackNavigationProp<ParamList, "showPaymentDetail">;
};
export const PaymentDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const paymentState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const [isVisibility, setIsVisibility] = useState(false);
    const [reverseReason, setReverseReason] = useState("");
    const payment = route.params.payment;
    const dispatch = useDispatch();

    useEffect(() => {
        if (paymentState.addState == ActionState.done) {
            setIsVisibility(false);
            navigation.goBack();
        }
    }, [paymentState.addState]);

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
                !payment.hasReversal && !payment.isReversal ? (
                    paymentState.addState == ActionState.inProgress ? (
                        <ActivityIndicator
                            style={{ marginRight: 10 }}
                            color={"white"}
                        />
                    ) : (
                        <Icon
                            containerStyle={{ marginRight: 10 }}
                            type={"ionicon"}
                            name={"camera-reverse-outline"}
                            size={28}
                            tvParallaxProperties={undefined}
                            onPress={() => {
                                setIsVisibility(true);
                            }}
                        />
                    )
                ) : null,
        });
    });

    const buildData = () => {
        let data = [];
        data.push({
            title: "Date",
            data: [
                <StaticListItemComponent
                    title={moment(payment.createdAt).fromNow()}
                    value={moment(payment.createdAt).format("DD/MMM/yyyy")}
                />,
            ],
        });
        let paymentData = [];
        paymentData.push(
            <StaticListItemComponent
                title={"Name"}
                value={payment.customer.name}
            />,
            <StaticListItemComponent
                title={"Mobile"}
                value={payment.customer.mobile}
            />,
        );
        data.push({ title: "Customer", data: paymentData });
        data.push({
            title: "Amount",
            data: [
                <StaticListItemComponent
                    title={""}
                    value={`${payment.amount} Rs.`}
                />,
            ],
        });
        return data;
    };

    const reversPayment = () => {
        dispatch(reversePayment(payment.id, reverseReason));
    };

    return (
        <>
            {payment.hasReversal || payment.isReversal ? (
                <Badge
                    containerStyle={{ marginVertical: 5 }}
                    badgeStyle={{
                        backgroundColor: payment.hasReversal
                            ? "#8b0000"
                            : "#D75281",
                    }}
                    value={payment.hasReversal ? "Reversed" : "Reversal"}
                />
            ) : null}

            {payment.reverseReason != null ? (
                <Text
                    style={{
                        textAlign: "center",
                        backgroundColor: "white",
                        padding: 5,
                    }}
                >
                    {payment.reverseReason}
                </Text>
            ) : null}
            <SectionList
                sections={buildData()}
                renderSectionHeader={(header) => (
                    <Text style={{ padding: 10, backgroundColor: "#eee" }}>
                        {header.section.title}
                    </Text>
                )}
                // @ts-ignore
                renderItem={(item) => item.item}
            />
            <ReactNativeModal isVisible={isVisibility}>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            paddingRight: 10,
                            marginBottom: -15,
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "black",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                onPress={() => setIsVisibility(false)}
                                name={"close"}
                                color={"white"}
                                tvParallaxProperties={undefined}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: "white",
                            //height: 100,
                            zIndex: 0,
                            padding: 10,
                        }}
                    >
                        <Text style={{ color: "black" }}>
                            Please provide a reason for Reverse
                        </Text>
                        <TextInput
                            onChangeText={(v) => setReverseReason(v)}
                            style={{ height: 40 }}
                            placeholder={"Reason"}
                            numberOfLines={2}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                reversPayment();
                            }}
                            style={{
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 44,
                                backgroundColor: "#8b0000",
                            }}
                        >
                            {paymentState.addState == ActionState.inProgress ? (
                                <ActivityIndicator color={"white"} />
                            ) : (
                                <Text style={{ color: "white" }}>Reverse</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </>
    );
};
