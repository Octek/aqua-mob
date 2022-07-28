import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    Text,
    ActivityIndicator,
    FlatList,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { BottomSheet, Icon, ListItem } from "react-native-elements";
import { cleanupOrder, getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { ReactNativeModal } from "react-native-modal";

type Props = {
    route: RouteProp<ParamList, "ordersNavigator">;
    navigation: StackNavigationProp<ParamList, "ordersNavigator">;
};

export const OrdersListScreen: React.FC<Props> = ({ navigation }) => {
    const [page, setPage] = useState(0);
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    containerStyle={{ marginRight: 10 }}
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
        console.log("page:", page);
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
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            ListFooterComponent={() =>
                ordersState.fetchState === ActionState.inProgress ? (
                    <ActivityIndicator style={{ marginTop: 5 }} />
                ) : null
            }
            renderItem={({ item }) => (
                <OrderItemComponent
                    order={item}
                    onPress={(order) => {
                        dispatch(cleanupOrder());
                        navigation.push("showOrder", {
                            order: order,
                            pushed: false,
                        });
                    }}
                />
            )}
        />
    );
};
