import React, { useEffect } from "react";
import { ParamList } from "../../../common/param.list";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FAB, Icon, ListItem } from "react-native-elements";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { CartItemComponent } from "./components/cart.item.component";
import { OrderItemDto } from "../dtos/order.item.dto";
import { CartItemTotalComponent } from "./components/cart.item.total.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { cleanupOrders, placeOrder } from "../redux/actions/order.actions";
import { PlaceOrderDto } from "../dtos/place.order.dto";
import { voidCart } from "../redux/actions/cart.actions";

type Props = {
    route: RouteProp<ParamList, "placeOrder">;
    navigation: StackNavigationProp<ParamList, "placeOrder">;
};

export const PlaceOrderScreen: React.FC<Props> = ({ navigation }) => {
    const ordersState = useSelector(
        (state: ApplicationStateInterface) => state.ordersState,
    );
    const cartState = useSelector(
        (state: ApplicationStateInterface) => state.cartState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                ordersState.addState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 10 }}
                        color={"black"}
                    />
                ) : (
                    <Icon
                        style={{ marginRight: 10 }}
                        size={28}
                        name="save"
                        color="black"
                        disabled={
                            cartState.items.length === 0 ||
                            cartState.customer === undefined
                        }
                        tvParallaxProperties={undefined}
                        onPress={() => {
                            dispatch(
                                placeOrder(
                                    new PlaceOrderDto(
                                        cartState.customer?.id || 0,
                                        cartState.items,
                                    ),
                                ),
                            );
                        }}
                    />
                ),
        });
    });

    useEffect(() => {
        if (ordersState.addState === ActionState.done) {
            dispatch(voidCart());
            dispatch(cleanupOrders());
            navigation.goBack();
        }
    }, [ordersState.addState]);

    return (
        <View style={{ flex: 1 }}>
            <ListItem
                onPress={() =>
                    navigation.navigate("selectCustomer", { selectable: true })
                }
                bottomDivider
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
            >
                <ListItem.Content>
                    <ListItem.Title>
                        {cartState.customer
                            ? cartState.customer.name
                            : "Not selected"}
                    </ListItem.Title>
                    <ListItem.Subtitle>Customer</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron tvParallaxProperties={undefined} />
            </ListItem>
            <FlatList<OrderItemDto | undefined>
                style={{ flex: 1 }}
                data={[...cartState.items, undefined]}
                renderItem={({ item }) =>
                    item === undefined ? (
                        <CartItemTotalComponent items={cartState.items} />
                    ) : (
                        <CartItemComponent item={item} />
                    )
                }
            />
            <FAB
                color={"#cadcf0"}
                placement={"right"}
                visible={true}
                icon={{ name: "add", color: "black" }}
                onPress={() =>
                    navigation.navigate("selectProduct", { selectable: true })
                }
            />
        </View>
    );
};
