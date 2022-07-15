import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPayments } from "../redux/actions/payment.action";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";

type Props = {
    route: RouteProp<ParamList, "paymentsNavigator">;
    navigation: StackNavigationProp<ParamList, "paymentsNavigator">;
};

export const PaymentsListScreen: React.FC<Props> = ({ route, navigation }) => {
    const paymentState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
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
                    onPress={() => navigation.push("addPayment")}
                />
            ),
        });
    });

    useEffect(() => {
        dispatch(fetchPayments());
    }, []);

    return (
        <FlatList<Payment>
            style={{ flex: 1 }}
            data={paymentState.entities}
            renderItem={({ item }) => (
                <View>
                    <Text>
                        {item.amount}, {item.createdAt}
                    </Text>
                </View>
            )}
        />
    );
};
