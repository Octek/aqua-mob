import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList, SelectCustomerReason } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon, SearchBar } from "react-native-elements";
import { User } from "../../../common/entities/user.entity";
import { fetchCustomers } from "../redux/actions/customers.actions";
import { CustomerItemComponent } from "./components/customer.item.component";
import { setCartCustomer } from "../../orders/redux/actions/cart.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { setPaymentCustomer } from "../../payments/redux/actions/new.payment.actions";
import { cleanupCustomer } from "../redux/actions/customer.actions";
import { EmptyListItemComponent } from "../../../common/components/empty.list.item.component";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "customersNavigator">;
    navigation: StackNavigationProp<ParamList, "customersNavigator">;
};

export const CustomersListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [timeoutHandle, setTimeoutHandle] = useState(0);
    const [showRefreshControl, setShowRefreshControl] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const customersState = useSelector(
        (state: ApplicationStateInterface) => state.customersState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackComponent onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    const changeText = (t: string) => {
        console.log("change text====", t);
        setShowRefreshControl(false);
        setText(t);
        clearTimeout(timeoutHandle);
        setTimeoutHandle(setTimeout(() => setSearchTerm(t), 300));
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon
                    containerStyle={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() =>
                        navigation.push("upsertCustomer", {
                            customer: undefined,
                        })
                    }
                />
            ),
        });
    }, []);

    useEffect(() => {
        if (page > 0) {
            console.log("useEffect..");
            fetch();
        }
    }, [page, searchTerm]);

    useEffect(() => {
        console.log("hello");
        if (searchTerm !== "") {
            console.log("other useEffect..");
            setPage(1);
        }
    }, [searchTerm]);

    const fetch = () => {
        console.log("in fetch");
        dispatch(fetchCustomers(page, searchTerm));
    };

    const fetchNext = () => {
        if (customersState.page && page < customersState.page.totalPages) {
            setPage(page + 1);
        }
    };

    const listHeader = () => {
        return (
            <SearchBar
                showLoading={
                    customersState.fetchState === ActionState.inProgress &&
                    !showRefreshControl
                }
                autoCapitalize={"none"}
                // @ts-ignore
                onChangeText={changeText}
                value={text}
                placeholder={"Search"}
            />
        );
    };
    console.log("searchText===", searchTerm);
    return (
        <FlatList<User>
            contentContainerStyle={{ flexGrow: 1 }}
            data={customersState.entities}
            ListEmptyComponent={
                customersState.fetchState !== ActionState.inProgress ? (
                    <EmptyListItemComponent />
                ) : null
            }
            keyExtractor={(customer) => customer.id.toString()}
            onRefresh={() => {
                setPage(0);
                setPage(1);
                setShowRefreshControl(true);
            }}
            refreshing={
                customersState.fetchState === ActionState.inProgress &&
                showRefreshControl
            }
            onEndReachedThreshold={0.5}
            onEndReached={(options) => {
                console.log("distanceFromEnd", options.distanceFromEnd);
                if (options.distanceFromEnd < 0) {
                    return;
                }
                fetchNext();
            }}
            ListHeaderComponent={
                customersState.entities.length === 0
                    ? searchTerm.length === 0
                        ? null
                        : listHeader()
                    : listHeader()
            }
            renderItem={({ item }) => (
                <CustomerItemComponent
                    customer={item}
                    onPress={(customer) => {
                        if (
                            route.params &&
                            route.params.selectable &&
                            route.params.reason ===
                                SelectCustomerReason.CreateOrder
                        ) {
                            dispatch(setCartCustomer(customer));
                            navigation.goBack();
                        } else if (
                            route.params &&
                            route.params.selectable &&
                            route.params.reason ===
                                SelectCustomerReason.CreatePayment
                        ) {
                            dispatch(setPaymentCustomer(customer));
                            navigation.goBack();
                        } else {
                            dispatch(cleanupCustomer());
                            navigation.push("showCustomer", {
                                customer: customer,
                            });
                        }
                    }}
                />
            )}
        />
    );
};
