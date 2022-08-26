import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { CompanyStatus } from "../../../common/entities/company.entity";
import { useDispatch, useSelector } from "react-redux";
import {
    addCustomerOrder,
    fetchCustomerOrders,
    setOrderCustomer,
} from "../redux/actions/customer.order.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "../../orders/screens/components/order.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { cleanupOrders } from "../../orders/redux/actions/order.actions";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "customerOrders">;
    navigation: StackNavigationProp<ParamList, "customerOrders">;
};

export const CustomerOrdersScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    const dispatch = useDispatch();
    const customer = route.params.customer;
    const [page, setPage] = useState(1);
    const customerOrdersState = useSelector(
        (state: ApplicationStateInterface) => state.customerOrdersState,
    );
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackComponent onPress={() => navigation.goBack()} />
            ),
        });
    });

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => {
                        if (
                            route.params.customer.status !=
                            CompanyStatus.blocked
                        ) {
                            dispatch(cleanupOrders());
                            dispatch(setOrderCustomer(customer));
                            navigation.push("ordersNavigator", {
                                screen: "placeOrder",
                                params: {
                                    customer: route.params.customer,
                                    selectCustomerDisable: true,
                                },
                            });
                        } else {
                            showMessage({
                                message: "This customer is blocked",
                            });
                        }
                    }}
                />
            ),
        });
    });

    const orderItemPress = (order: Order) => {
        navigation.push("showOrder", {
            order: order,
            pushed: true,
        });
    };

    useEffect(() => {
        if (ordersState.addState === ActionState.done) {
            console.log("i'm done with id", ordersState.entities[0]);
            dispatch(addCustomerOrder(ordersState.entities[0]));
        }
    }, [ordersState.addState]);

    useEffect(() => {
        console.log("page===", page);
        if (page > 0) {
            fetch();
        }
    }, [page]);

    const fetch = () => {
        dispatch(fetchCustomerOrders(customer.id, page));
    };
    const fetchNext = () => {
        if (
            customerOrdersState.page &&
            page < customerOrdersState.page.totalPages
        ) {
            setPage(page + 1);
        }
    };

    return (
        <FlatList<Order>
            onRefresh={() => {
                console.log("page=== onRefresh", page);
                setPage(0);
                setPage(1);
            }}
            refreshing={
                customerOrdersState.fetchState === ActionState.inProgress
            }
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            data={customerOrdersState.entities}
            renderItem={({ item }) => (
                <OrderItemComponent order={item} onPress={orderItemPress} />
            )}
        />
    );
};
