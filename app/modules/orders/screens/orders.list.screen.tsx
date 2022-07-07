import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon } from "react-native-elements";
import { getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";

type Props = {
    route: RouteProp<ParamList, "orders">;
    navigation: StackNavigationProp<ParamList, "orders">;
};

export const OrdersListScreen: React.FC<Props> = ({ route, navigation }) => {
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
                    onPress={() => navigation.push("placeOrder")}
                />
            ),
        });
    });

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <FlatList<Order>
            style={{ flex: 1 }}
            data={ordersState.entities}
            renderItem={({ item }) => (
                <OrderItemComponent
                    order={item}
                    onPress={(order) =>
                        navigation.push("showOrder", { order: order })
                    }
                />
            )}
        />
    );
};
