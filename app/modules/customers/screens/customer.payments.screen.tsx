import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";
import {
    addCustomerPayment,
    fetchCustomerPayments,
} from "../redux/actions/customer.payment.action";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentItemComponent } from "../../payments/screens/components/payment.item.component";
import { Icon } from "react-native-elements";
import { setPaymentCustomer } from "../../payments/redux/actions/new.payment.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { showMessage } from "react-native-flash-message";
import { CompanyStatus } from "../../../common/entities/company.entity";
import { EmptyListItemComponent } from "../../../common/components/empty.list.item.component";

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
    const paymentsState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const customer = route.params.customer;
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    containerStyle={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => {
                        if (
                            route.params.customer.status !=
                            CompanyStatus.blocked
                        ) {
                            dispatch(setPaymentCustomer(customer));
                            navigation.push("addPayment", {
                                selectCustomerDisable: true,
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

    useEffect(() => {
        console.log("paymentState.addState:", paymentsState.addState);
        if (paymentsState.addState === ActionState.done) {
            console.log("paymentState===", paymentsState.entities[0]);
            dispatch(addCustomerPayment(paymentsState.entities[0]));
        }
    }, [paymentsState.addState]);

    useEffect(() => setPage(1), []);

    useEffect(() => {
        console.log("page===", page);
        if (page > 0) {
            fetch();
        }
    }, [page]);

    const fetch = () => {
        dispatch(fetchCustomerPayments(customer.id, page));
    };

    const fetchNext = () => {
        if (
            customerPaymentState.page &&
            page < customerPaymentState.page.totalPages
        ) {
            setPage(page + 1);
        }
    };

    return (
        // @ts-ignore //
        <FlatList<Payment>
            contentContainerStyle={{ flexGrow: 1 }}
            onRefresh={() => {
                console.log("page=== onRefresh", page);
                setPage(0);
                setPage(1);
            }}
            refreshing={
                customerPaymentState.fetchState === ActionState.inProgress
            }
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            ListEmptyComponent={
                customerPaymentState.fetchState !== ActionState.inProgress ? (
                    <EmptyListItemComponent />
                ) : null
            }
            data={customerPaymentState.entities}
            renderItem={({ item }) => {
                return (
                    <PaymentItemComponent
                        payment={item}
                        onPress={() => console.log("called")}
                    />
                );
            }}
        />
    );
};
