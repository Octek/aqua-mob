import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Icon, ListItem } from "react-native-elements";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    cleanupPayments,
    fetchPayments,
} from "../redux/actions/payment.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";
import { PaymentItemComponent } from "./components/payment.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { FilterSegment } from "../dtos/payment.dto";
import { cleanupNewPayment } from "../redux/actions/new.payment.actions";
import { EmptyListItemComponent } from "../../../common/components/empty.list.item.component";

type Props = {
    route: RouteProp<ParamList, "paymentsNavigator">;
    navigation: StackNavigationProp<ParamList, "paymentsNavigator">;
};

export const PaymentsListScreen: React.FC<Props> = ({ navigation }) => {
    const [page, setPage] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(FilterSegment.All);
    const paymentState = useSelector(
        (state: ApplicationStateInterface) => state.paymentsState,
    );
    const buttons = ["All", "Cash", "Online"];
    const dispatch = useDispatch();
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
                        dispatch(cleanupNewPayment());
                        navigation.push("addPayment", {
                            selectCustomerDisable: false,
                        });
                    }}
                />
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
        dispatch(fetchPayments(page, selectedIndex));
    };

    const fetchNext = () => {
        if (paymentState.page && page < paymentState.page.totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <FlatList<Payment>
            contentContainerStyle={{ flexGrow: 1 }}
            onRefresh={() => {
                setPage(0);
                setPage(1);
            }}
            refreshing={paymentState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            ListEmptyComponent={
                paymentState.fetchState !== ActionState.inProgress ? (
                    <EmptyListItemComponent />
                ) : null
            }
            ListHeaderComponent={
                paymentState.entities.length > 0 ? (
                    <ListItem.ButtonGroup
                        containerStyle={{
                            backgroundColor: "#383838",
                        }}
                        selectedButtonStyle={{
                            backgroundColor:
                                Payment.buttonBackgroundColor(selectedIndex),
                        }}
                        buttons={buttons}
                        selectedIndex={currentIndex}
                        onPress={(selected) => {
                            setCurrentIndex(selected);
                            setPage(1);
                            setSelectedIndex(selected - 1);
                        }}
                    />
                ) : null
            }
            style={{ flex: 1 }}
            data={paymentState.entities}
            renderItem={({ item }) => {
                return (
                    <PaymentItemComponent
                        payment={item}
                        onPress={(payment) => {
                            dispatch(cleanupPayments());
                            navigation.push("showPaymentDetail", {
                                payment: payment,
                            });
                        }}
                    />
                );
            }}
        />
    );
};
