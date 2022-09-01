import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon, ListItem } from "react-native-elements";
import { cleanupOrder, getOrders } from "../redux/actions/order.actions";
import { Order } from "../../../common/entities/order.entity";
import { OrderItemComponent } from "./components/order.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { OrderFilters } from "../dtos/order.item.dto";
import { cleanupCartCustomer } from "../redux/actions/cart.actions";
import { EmptyListItemComponent } from "../../../common/components/empty.list.item.component";
import { StaticDropdownComponent } from "../../../common/components/static.dropdown.component";

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
    const countries = ["New", "On the way", " Done", "Cancelled", "Clear All"];
    const groupButtons = ["New", "On the way", " Done", "Cancelled"];
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        // paddingRight: 10,
                        marginBottom: -15,
                        zIndex: 1,
                    }}
                >
                    <StaticDropdownComponent />
                    {/*<SelectDropdown*/}
                    {/*    selectedRowStyle={{ backgroundColor: "grey" }}*/}
                    {/*    defaultValue={"test"}*/}
                    {/*    defaultButtonText={"New"}*/}
                    {/*    buttonStyle={{*/}
                    {/*        height: 40,*/}
                    {/*        width: 90,*/}
                    {/*        paddingBottom: 10,*/}
                    {/*        // marginBottom: 10,*/}
                    {/*        backgroundColor: "white",*/}
                    {/*    }}*/}
                    {/*    buttonTextStyle={{ fontSize: 12 }}*/}
                    {/*    dropdownStyle={{*/}
                    {/*        width: 120,*/}
                    {/*        justifyContent: "flex-start",*/}
                    {/*    }}*/}
                    {/*    data={countries}*/}
                    {/*    onSelect={(selectedItem, index) => {*/}
                    {/*        console.log(selectedItem, index);*/}
                    {/*    }}*/}
                    {/*    buttonTextAfterSelection={(selectedItem, index) => {*/}
                    {/*        // text represented after item is selected*/}
                    {/*        // if data array is an array of objects then return selectedItem.property to render after item is selected*/}
                    {/*        return selectedItem;*/}
                    {/*    }}*/}
                    {/*    rowTextForSelection={(item, index) => {*/}
                    {/*        // text represented for each item in dropdown*/}
                    {/*        // if data array is an array of objects then return item.property to represent item in dropdown*/}
                    {/*        return item;*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <Icon
                        containerStyle={{ marginRight: 10 }}
                        size={28}
                        name="add-circle"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() => {
                            dispatch(cleanupCartCustomer());
                            navigation.push("placeOrder", {
                                selectCustomerDisable: false,
                            });
                        }}
                    />
                </View>
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
            contentContainerStyle={{ flexGrow: 1 }}
            data={ordersState.entities}
            ListEmptyComponent={
                ordersState.fetchState !== ActionState.inProgress ? (
                    <EmptyListItemComponent />
                ) : null
            }
            ListHeaderComponent={
                ordersState.entities.length > 0 ? (
                    <ListItem.ButtonGroup
                        containerStyle={{
                            backgroundColor: "#383838",
                        }}
                        buttons={groupButtons}
                        selectedIndex={currentIndex}
                        selectedButtonStyle={{
                            backgroundColor:
                                Order.orderFiltersColor(currentIndex),
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
                ) : null
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
