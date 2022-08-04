import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, View } from "react-native";
import { Icon } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { CompanyStatus } from "../../../common/entities/company.entity";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCustomerOrders,
    setOrderCustomer,
} from "../redux/actions/customer.order.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "../../orders/screens/components/order.item.component";

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
    const customerOrdersState = useSelector(
        (state: ApplicationStateInterface) => state.customerOrdersState,
    );
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

    useEffect(() => {
        dispatch(fetchCustomerOrders(customer.id));
    }, []);
    return (
        <FlatList<Order>
            data={customerOrdersState.entities}
            renderItem={({ item }) => (
                <OrderItemComponent
                    order={item}
                    onPress={(order) => {
                        navigation.push("showOrder", {
                            order: order,
                            pushed: true,
                        });
                    }}
                />
            )}
        />
    );
};
