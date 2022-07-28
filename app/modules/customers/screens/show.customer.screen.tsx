import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FAB, Icon, ListItem } from "react-native-elements";
import { StaticListItemComponent } from "../../../common/components/static.list.item.component";
import { FlatList, View } from "react-native";

type Props = {
    route: RouteProp<ParamList, "showCustomer">;
    navigation: StackNavigationProp<ParamList, "showCustomer">;
};

export const ShowCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
    const customer = route.params.customer;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    containerStyle={{ marginRight: 10 }}
                    size={28}
                    name="edit"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => {
                        console.log("pressed");
                        navigation.push("upsertCustomer", {
                            customer: customer,
                        });
                    }}
                />
            ),
        });
    });

    const rows = [
        <StaticListItemComponent
            title="Name"
            value={customer.name}
            showChevron={false}
        />,
        <StaticListItemComponent
            title="Mobile"
            value={customer.mobile || "Not Available"}
        />,
        <StaticListItemComponent
            title="Email"
            value={customer.email || "Not Available"}
        />,
        // @ts-ignore
        <ListItem
            bottomDivider
            onPress={() =>
                navigation.navigate("customerOrders", { customer: customer })
            }
        >
            <ListItem.Content>
                <ListItem.Title>Orders</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>Payments</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
