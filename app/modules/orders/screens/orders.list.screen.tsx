import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "react-native";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon, ListItem } from "react-native-elements";
import { cleanupOrder, getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { orderFilters } from "../dtos/order.item.dto";

type Props = {
    route: RouteProp<ParamList, "ordersNavigator">;
    navigation: StackNavigationProp<ParamList, "ordersNavigator">;
};

export const OrdersListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [page, setPage] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );
    const dispatch = useDispatch();
    const buttonOne = () => <Text style={styles.buttonStyle}>New</Text>;
    const buttonTwo = () => <Text style={styles.buttonStyle}>On the way</Text>;
    const buttonThree = () => <Text style={styles.buttonStyle}>Done</Text>;
    const buttonFour = () => <Text style={styles.buttonStyle}>Cancelled</Text>;
    const groupButtons = [
        { element: buttonOne },
        { element: buttonTwo },
        { element: buttonThree },
        { element: buttonFour },
    ];
    // const groupButtons = ["New", "On the way", " Done", "Cancelled"];
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
        console.log("page:", page);
        fetchOrdersMethod(currentIndex);
    };

    const fetchNext = () => {
        if (ordersState.page && page < ordersState.page.totalPages) {
            setPage(page + 1);
        }
    };
    const fetchOrdersMethod = (selected: number) => {
        if (selected == 0) {
            dispatch(getOrders(1, orderFilters.New));
        } else if (selected == 1) {
            dispatch(getOrders(1, orderFilters.OnTheWay));
        } else if (selected == 2) {
            dispatch(getOrders(1, orderFilters.Fulfilled));
        } else {
            dispatch(getOrders(1, orderFilters.CancelledByUser));
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
                        backgroundColor:
                            currentIndex == 0
                                ? "#ffbf00"
                                : currentIndex == 1
                                ? "#002d62"
                                : currentIndex == 2
                                ? "#ff69b4"
                                : "#8b0000",
                    }}
                    onPress={(selected) => {
                        setPage(1);
                        setCurrentIndex(selected);
                        fetchOrdersMethod(selected);
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

const styles = StyleSheet.create({
    buttonStyle: {
        color: "white",
    },
});
