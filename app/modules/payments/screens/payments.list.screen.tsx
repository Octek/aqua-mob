import React, { useEffect, useMemo, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Icon, ListItem } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { fetchPayments } from "../redux/actions/payment.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Payment } from "../../../common/entities/payment.entity";
import { PaymentItemComponent } from "./components/payment.item.component";
import { ActionState } from "../../../common/redux/entity.state.interface";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type Props = {
    route: RouteProp<ParamList, "paymentsNavigator">;
    navigation: StackNavigationProp<ParamList, "paymentsNavigator">;
};

export const PaymentsListScreen: React.FC<Props> = ({ navigation }) => {
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
        if (paymentState.page && page < paymentState.page.totalPages) {
            setPage(page + 1);
        }
    };
    return (
        <>
            <FlatList<Payment>
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
                style={{ flex: 1 }}
                data={paymentState.entities}
                renderItem={({ item }) => {
                    return <PaymentItemComponent payment={item} />;
                }}
            />
            {/*<View style={styles.container}>*/}
            {/*<BottomSheet snapPoints={snapPoints}>*/}
            {/*    <Text style={{ fontSize: 20 }}>Reverse Reasons</Text>*/}
            {/*    <BottomSheetTextInput style={styles.input} />*/}
            {/*</BottomSheet>*/}
            {/*</View>*/}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: "rgba(151, 151, 151, 0.25)",
    },
});
