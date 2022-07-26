import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, ListItem } from "react-native-elements";
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
    SectionList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActionState } from "../../../common/redux/entity.state.interface";

type Props = {
    route: RouteProp<ParamList, "showOrder">;
    navigation: StackNavigationProp<ParamList, "showOrder">;
};

export const ShowOrderScreen: React.FC<Props> = ({ route }) => {
    const [currentOrder, setCurrentOrder] = useState<Order>(route.params.order);
    const orderState = useSelector(
        (state: ApplicationStateInterface) => state.orderState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (!route.params.pushed) {
            dispatch(getOrderDetails(currentOrder.id));
        }
    }, []);

    useEffect(() => {
        if (orderState.entity) {
            setCurrentOrder(orderState.entity);
        }
    }, [orderState.entity]);

    useEffect(() => {
        if (orderState.updateState === ActionState.done) {
            dispatch(refreshOrder(orderState.entity!));
        }
    }, [orderState.updateState]);

    const buildData = () => {
        let data = [];
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
                    title={`${item.quantity} x Rs. ${item.price}`}
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
        data.push({
            title: "Status",
            data: [
                <ListItem.Swipeable
                    leftContent={
                        (currentOrder.status === OrderStatus.New ||
                            currentOrder.status === OrderStatus.OnTheWay) && (
                            <TouchableOpacity
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    flexDirection: "column",
                                    backgroundColor:
                                        currentOrder.status === OrderStatus.New
                                            ? "#002d62"
                                            : "#ff69b4",
                                }}
                                onPress={() =>
                                    currentOrder.status === OrderStatus.New
                                        ? dispatch(
                                              dispatchOrder(currentOrder.id),
                                          )
                                        : dispatch(fulfilOrder(currentOrder.id))
                                }
                            >
                                {orderState.updateState ===
                                ActionState.inProgress ? (
                                    <ActivityIndicator color={"white"} />
                                ) : (
                                    <Icon
                                        color={"white"}
                                        name={
                                            currentOrder.status ===
                                            OrderStatus.New
                                                ? "commute"
                                                : "done"
                                        }
                                        tvParallaxProperties={undefined}
                                    />
                                )}
                            </TouchableOpacity>
                        )
                    }
                    rightContent={
                        (currentOrder.status === OrderStatus.New ||
                            currentOrder.status === OrderStatus.OnTheWay) && (
                            <TouchableOpacity
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1,
                                    flexDirection: "column",
                                    backgroundColor: "#8b0000",
                                }}
                                onPress={() =>
                                    dispatch(cancelOrder(currentOrder.id))
                                }
                            >
                                {orderState.updateState ===
                                ActionState.inProgress ? (
                                    <ActivityIndicator color={"white"} />
                                ) : (
                                    <Icon
                                        color={"white"}
                                        name="cancel"
                                        tvParallaxProperties={undefined}
                                    />
                                )}
                            </TouchableOpacity>
                        )
                    }
                >
                    <ListItem.Content
                        style={{
                            height: 50,
                            paddingLeft: 10,
                            backgroundColor:
                                currentOrder.statusInfo.backgroundColor,
                        }}
                    >
                        <ListItem.Title>
                            <Text
                                style={{
                                    color: currentOrder.statusInfo.textColor,
                                }}
                            >
                                {currentOrder.statusInfo.text}
                            </Text>
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem.Swipeable>,
            ],
        });
        console.log("data:", data);
        return data;
    };

    return (
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
    );
};
