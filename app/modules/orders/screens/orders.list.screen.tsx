import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon } from "react-native-elements";
import { cleanupOrder, getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";
import { fetchCustomers } from "../../customers/redux/actions/customer.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";

type Props = {
    route: RouteProp<ParamList, "ordersNavigator">;
    navigation: StackNavigationProp<ParamList, "ordersNavigator">;
};

export const OrdersListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [page, setPage] = useState(0);
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() =>
                        navigation.push("placeOrder", { customer: undefined })
                    }
                />
            ),
        });
    });

    useEffect(() => setPage(1), []);

    useEffect(() => {
        if (page > 0) {
            fetch();
        }
    }, [page]);

    const fetch = () => {
        dispatch(getOrders(page));
    };

    const fetchNext = () => {
        if (ordersState.page && page < ordersState.page.totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <FlatList<Order>
            style={{ flex: 1 }}
            data={ordersState.entities}
            onRefresh={() => {
                setPage(0);
                setPage(1);
            }}
            refreshing={ordersState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.7}
            onEndReached={() => fetchNext()}
            renderItem={({ item }) => (
                <OrderItemComponent
                    order={item}
                    onPress={(order) => {
                        dispatch(cleanupOrder());
                        navigation.push("showOrder", { order: order });
                    }}
                />
            )}
        />
    );
};
