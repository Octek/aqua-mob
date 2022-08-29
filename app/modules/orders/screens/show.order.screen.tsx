import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { Badge, Icon } from "react-native-elements";
import { StaticListItemComponent } from "../../../common/components/static.list.item.component";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import {
    cancelOrder,
    dispatchOrder,
    fulfilOrder,
    getOrderDetails,
    refreshOrder,
} from "../redux/actions/order.actions";
import { Order, OrderStatus } from "../../../common/entities/order.entity";
import {
    ActivityIndicator,
    Keyboard,
    SectionList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ActionState } from "../../../common/redux/entity.state.interface";
import moment from "moment";
import { ReactNativeModal } from "react-native-modal";
import { HeaderBackComponent } from "../../../common/components/header.back.component";
import { showMessage } from "react-native-flash-message";

type Props = {
    route: RouteProp<ParamList, "showOrder">;
    navigation: StackNavigationProp<ParamList, "showOrder">;
};

export const ShowOrderScreen: React.FC<Props> = ({ route, navigation }) => {
    const [currentOrder, setCurrentOrder] = useState<Order>(route.params.order);
    const [showingCancelOrder, toggleCancelOrder] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const orderState = useSelector(
        (state: ApplicationStateInterface) => state.orderState,
    );
    const dispatch = useDispatch();

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
                (currentOrder.status === OrderStatus.New ||
                    currentOrder.status === OrderStatus.OnTheWay) &&
                (orderState.updateState === ActionState.inProgress ? (
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
                            name={
                                currentOrder.status === OrderStatus.New
                                    ? "commute"
                                    : "done"
                            }
                            color="black"
                            tvParallaxProperties={undefined}
                            onPress={() => {
                                console.log("working fine==", OrderStatus.New);
                                currentOrder.status === OrderStatus.New
                                    ? dispatch(dispatchOrder(currentOrder.id))
                                    : dispatch(fulfilOrder(currentOrder.id));
                            }}
                        />

                        {currentOrder.status !== OrderStatus.OnTheWay && (
                            <Icon
                                containerStyle={{ marginRight: 10 }}
                                size={28}
                                name="cancel"
                                color="black"
                                tvParallaxProperties={undefined}
                                onPress={() => toggleCancelOrder(true)}
                            />
                        )}
                    </View>
                )),
        });
    });

    useEffect(() => {
        if (!route.params.pushed) {
            console.log("orderData:");
            dispatch(getOrderDetails(currentOrder.id));
        }
    }, []);

    useEffect(() => {
        if (orderState.entity) {
            console.log("orderState.entity:", orderState.entity.status);
            setCurrentOrder(orderState.entity);
        }
    }, [orderState.entity]);

    useEffect(() => {
        if (orderState.updateState === ActionState.done) {
            dispatch(refreshOrder(orderState.entity!));
            setCancelReason("");
            toggleCancelOrder(false);
        }
    }, [orderState.updateState]);

    const buildData = () => {
        let data = [];
        data.push({
            title: "Date",
            data: [
                <StaticListItemComponent
                    title={moment(currentOrder.createdAt).fromNow()}
                    value={moment(currentOrder.createdAt).format("DD/MMM/yyyy")}
                />,
            ],
        });
        let customerData = [];
        customerData.push(
            <StaticListItemComponent
                title={"Name"}
                value={currentOrder.customer.name}
            />,
            <StaticListItemComponent
                title={"Mobile"}
                value={currentOrder.customer.mobile}
            />,
            currentOrder.customer.email && (
                <StaticListItemComponent
                    title={"Email"}
                    value={currentOrder.customer.email}
                />
            ),
            <StaticListItemComponent
                title={"Address"}
                value={currentOrder.customer.address}
            />,
        );
        data.push({ title: "Customer", data: customerData });
        data.push({
            title: "Items",
            data: currentOrder.items.map((item) => (
                <StaticListItemComponent
                    title={`${item.quantity} x ${item.price} Rs.`}
                    value={item.product ? item.product.name : "..."}
                />
            )),
        });
        data.push({
            title: "Totals",
            data: [
                <StaticListItemComponent
                    title={"Sub Total"}
                    value={`${
                        currentOrder.total - currentOrder.deliveryCharges
                    } Rs.`}
                />,
                <StaticListItemComponent
                    title={"Delivery Charges"}
                    value={`${currentOrder.deliveryCharges} Rs.`}
                />,
                <StaticListItemComponent
                    title={"Total"}
                    value={`${currentOrder.total} Rs.`}
                />,
            ],
        });
        return data;
    };

    return (
        <>
            <Badge
                containerStyle={{ marginVertical: 5, padding: 3 }}
                badgeStyle={{
                    backgroundColor: currentOrder.statusInfo.backgroundColor,
                }}
                value={currentOrder.statusInfo.text}
            />
            {currentOrder.cancelReason != null ? (
                <Text
                    style={{
                        textAlign: "center",
                        backgroundColor: "white",
                        marginVertical: 5,
                        padding: 5,
                    }}
                >
                    {currentOrder.cancelReason}
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

            <ReactNativeModal isVisible={showingCancelOrder}>
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
                                onPress={() => toggleCancelOrder(false)}
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
                            Please provide a reason for cancellation
                        </Text>
                        <TextInput
                            onChangeText={(v) => setCancelReason(v)}
                            style={{ height: 40 }}
                            placeholder={"Reason"}
                            numberOfLines={2}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                cancelReason !== ""
                                    ? dispatch(
                                          cancelOrder(
                                              currentOrder.id,
                                              cancelReason,
                                          ),
                                      )
                                    : showMessage({
                                          message:
                                              "Please Add The Cancel Reason",
                                      });
                            }}
                            style={{
                                borderRadius: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                height: 44,
                                backgroundColor: "#8b0000",
                            }}
                        >
                            {orderState.updateState ===
                                ActionState.inProgress && (
                                <ActivityIndicator size={"small"} />
                            )}
                            {orderState.updateState !==
                                ActionState.inProgress && (
                                <Text style={{ color: "white" }}>
                                    Cancel Order
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </>
    );
};
