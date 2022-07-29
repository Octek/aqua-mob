import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";
import { customerPayments } from "../redux/actions/customer.payment.action";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentItemComponent } from "../../payments/screens/components/payment.item.component";

type Props = {
    route: RouteProp<ParamList, "customerPayments">;
    navigation: StackNavigationProp<ParamList, "customerPayments">;
};

export const CustomerPaymentsScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    const customerPaymentState = useSelector(
        (state: ApplicationStateInterface) => state.customerPaymentsState,
    );
    const dispatch = useDispatch();
    const customer = route.params.customer;
    useEffect(() => {
        dispatch(customerPayments(customer.id));
    }, []);
    return (
        // @ts-ignore
        <FlatList<Payment>
            style={{ flex: 1 }}
            data={customerPaymentState.entities}
            renderItem={({ item }) => {
                return <PaymentItemComponent payment={item} />;
            }}
        />
    );
};
