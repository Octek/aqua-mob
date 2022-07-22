import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPayments } from "../redux/actions/payments.action";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";
import { PaymentItemComponent } from "./components/payment.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";

type Props = {
    route: RouteProp<ParamList, "paymentsNavigator">;
    navigation: StackNavigationProp<ParamList, "paymentsNavigator">;
};

export const PaymentsListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [page, setPage] = useState(0);
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
    useEffect(() => setPage(1), []);
    useEffect(() => {
        if (page > 0) {
            fetch();
        }
    }, [page]);
    const fetch = () => {
        dispatch(fetchPayments(page));
    };
    const fetchNext = () => {
        console.log("totalPagesInPayments==", paymentState.page?.totalPages);
        if (paymentState.page && page < paymentState.page.totalPages) {
            setPage(page + 1);
        }
    };
    return (
        <FlatList<Payment>
            onRefresh={() => {
                setPage(0);
                setPage(1);
            }}
            onEndReached={() => fetchNext()}
            refreshing={paymentState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.7}
            style={{ flex: 1 }}
            data={paymentState.entities}
            renderItem={({ item }) => <PaymentItemComponent payment={item} />}
        />
    );
};
