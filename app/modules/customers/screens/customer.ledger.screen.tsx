import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { fetchCustomerLedger } from "../redux/actions/custom.ledger.actions";

type Props = {
    route: RouteProp<ParamList, "showLedger">;
    navigation: StackNavigationProp<ParamList, "showLedger">;
};

export const CustomerLedgerScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    const dispatch = useDispatch();
    const customer = route.params.customer;
    useEffect(() => {
        dispatch(fetchCustomerLedger(customer.id, customer.createdAt));
    }, []);
    return (
        <View>
            <Text>Name: {route.params.customer.name}</Text>
        </View>
    );
};
