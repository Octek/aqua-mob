import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon, ListItem } from "react-native-elements";
import { cleanupOrder, getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { OrderFilters } from "../dtos/order.item.dto";

type Props = {
    route: RouteProp<ParamList, "ordersNavigator">;
    navigation: StackNavigationProp<ParamList, "ordersNavigator">;
};

export const OrdersListScreen: React.FC<Props> = ({ navigation }) => {
    const [page, setPage] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(OrderFilters.New);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );
    const dispatch = useDispatch();
    const groupButtons = ["New", "On the way", " Done", "Cancelled"];
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
    }, [page, selectedIndex]);

    const fetch = () => {
        console.log("get data by users=====", selectedIndex);
        dispatch(getOrders(page, selectedIndex));
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
            ListHeaderComponent={
                <ListItem.ButtonGroup
                    containerStyle={{
                        backgroundColor: "#383838",
                    }}
                    buttons={groupButtons}
                    selectedIndex={currentIndex}
                    selectedButtonStyle={{
                        backgroundColor: Order.orderFiltersColor(currentIndex),
                    }}
                    onPress={(selected) => {
                        setPage(1);
                        setCurrentIndex(selected);
                        setSelectedIndex(
                            selected > 2
                                ? OrderFilters.CancelledByUser
                                : selected,
                        );
                    }}
                />
            }
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
