import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerLedger } from "../redux/actions/custom.ledger.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";

import { ActionState } from "../../../common/redux/entity.state.interface";
import { LedgerItem } from "../../../common/entities/ledger.entity";
import { CustomerLedgerItemComponent } from "./components/customer.ledger.item.component";
import { Icon, ListItem } from "react-native-elements";
import { cleanupUsers } from "../../users/redux/actions/users.actions";

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
        navigation.setOptions({
            headerTitle: `${customer.name.substring(
                0,
                customer.name.indexOf(" "),
            )}'s Ledger`,
        });
    });

    useEffect(() => {
        console.log("page===", page);
        if (page > 0) {
            fetch();
        }
    }, [page]);

    const fetch = () => {
        dispatch(fetchCustomerLedger(customer.id, customer.createdAt, page));
    };

    const fetchNext = () => {
        if (ledgerState.page && page < ledgerState.page.totalPages) {
            setPage(page + 1);
        }
    };
    return (
        // @ts-ignore //
        <FlatList<LedgerItem>
            style={{ flex: 1 }}
            onRefresh={() => {
                console.log("page=== onRefresh", page);
                setPage(0);
                setPage(1);
            }}
            ListHeaderComponent={
                // @ts-ignore
                <ListItem bottomDivider={true}>
                    <ListItem.Content
                        style={{
                            flex: 6,
                            alignItems: "center",
                            margin: 0,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <ListItem.Content style={{ flex: 2 }}>
                            <ListItem.Title
                                numberOfLines={1}
                                style={{ fontWeight: "bold" }}
                            >
                                Description
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content style={{ flex: 1 }} />
                        <ListItem.Content
                            style={{
                                flex: 3,
                                alignItems: "center",
                                margin: 0,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: "bold" }}>
                                    Amount
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: "bold" }}>
                                    Balance
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem.Content>
                    </ListItem.Content>
                </ListItem>
            }
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
                return <CustomerLedgerItemComponent ledgerItem={item} />;
            }}
        />
    );
};
