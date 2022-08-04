import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { CompanyStatus } from "../../../common/entities/company.entity";

type Props = {
    route: RouteProp<ParamList, "customerOrders">;
    navigation: StackNavigationProp<ParamList, "customerOrders">;
};

export const CustomerOrdersScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    size={28}
                    name="add"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => {
                        if (
                            route.params.customer.status !=
                            CompanyStatus.blocked
                        ) {
                            navigation.push("ordersNavigator", {
                                screen: "placeOrder",
                                params: { customer: route.params.customer },
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
    return <View />;
};
