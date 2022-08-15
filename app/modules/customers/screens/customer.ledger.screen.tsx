import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerLedger } from "../redux/actions/custom.ledger.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";

import { ActionState } from "../../../common/redux/entity.state.interface";
import { Ledger } from "../../../common/entities/ledger.entity";
import { CustomerLedgerItemComponent } from "./components/customer.ledger.item.component";
import { ListItem } from "react-native-elements";

type Props = {
    route: RouteProp<ParamList, "showLedger">;
    navigation: StackNavigationProp<ParamList, "showLedger">;
};

export const CustomerLedgerScreen: React.FC<Props> = ({
    route,
    navigation,
}) => {
    const ledgerState = useSelector(
        (state: ApplicationStateInterface) => state.ledgerState,
    );
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const customer = route.params.customer;
    useEffect(() => setPage(1), []);

    useEffect(() => {
        console.log("page===", page);
        if (page > 0) {
            fetch();
        }
    }, [page]);

    const fetch = () => {
        dispatch(fetchCustomerLedger(customer.id, customer.createdAt));
    };

    const fetchNext = () => {
        if (ledgerState.page && page < ledgerState.page.totalPages) {
            setPage(page + 1);
        }
    };
    return (
        // @ts-ignore //
        <FlatList<Ledger>
            style={{ flex: 1 }}
            onRefresh={() => {
                console.log("page=== onRefresh", page);
                setPage(0);
                setPage(1);
            }}
            refreshing={ledgerState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            data={ledgerState.entities}
            renderItem={({ item }) => {
                return (
                    // <ListItem>
                    <CustomerLedgerItemComponent ledgerItem={item} />
                    // </ListItem>
                );
            }}
        />
    );
};
