import React, { useState } from "react";
import { ParamList } from "../../../common/param.list";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FAB, ListItem } from "react-native-elements";
import { User } from "../../../common/entities/user.entity";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { CartItemComponent } from "./components/cart.item.component";
import { OrderItemDto } from "../dtos/order.item.dto";

type Props = {
    route: RouteProp<ParamList, "placeOrder">;
    navigation: StackNavigationProp<ParamList, "placeOrder">;
};

export const PlaceOrderScreen: React.FC<Props> = ({ route, navigation }) => {
    const cartState = useSelector(
        (state: ApplicationStateInterface) => state.cartState,
    );
    const [customer, setCustomer] = useState<User | undefined>();

    return (
        <View style={{ flex: 1 }}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        {customer ? customer.name : "Not selected"}
                    </ListItem.Title>
                    <ListItem.Subtitle>Customer</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <FlatList<OrderItemDto>
                style={{ flex: 1 }}
                data={cartState.items}
                renderItem={({ item }) => <CartItemComponent item={item} />}
            />
            <FAB
                color={"#cadcf0"}
                placement={"right"}
                visible={true}
                icon={{ name: "add", color: "black" }}
                onPress={() => navigation.navigate("selectProduct")}
            />
        </View>
    );
};
