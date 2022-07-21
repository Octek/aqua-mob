import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { Icon } from "react-native-elements";
import { User } from "../../../common/entities/user.entity";
import { fetchCustomers } from "../redux/actions/customer.actions";
import { CustomerItemComponent } from "./components/customer.item.component";
import { setCustomer } from "../../orders/redux/actions/cart.actions";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { setPaymentsCustomer } from "../../payments/redux/actions/new.payment.action";

type Props = {
    route: RouteProp<ParamList, "customersNavigator">;
    navigation: StackNavigationProp<ParamList, "customersNavigator">;
};

export const CustomersListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [page, setPage] = useState(0);
    const customersState = useSelector(
        (state: ApplicationStateInterface) => state.customersState,
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
                    onPress={() =>
                        navigation.push("upsertCustomer", {
                            customer: undefined,
                        })
                    }
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
        dispatch(fetchCustomers(page));
    };

    const fetchNext = () => {
        if (customersState.page && page < customersState.page.totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <FlatList<User>
            style={{ flex: 1 }}
            data={customersState.entities}
            onRefresh={() => {
                setPage(0);
                setPage(1);
            }}
            refreshing={customersState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.7}
            onEndReached={() => fetchNext()}
            renderItem={({ item }) => (
                <CustomerItemComponent
                    customer={item}
                    onPress={(customer) => {
                        if (route.params && route.params.selectable) {
                            dispatch(setCustomer(customer));
                            navigation.goBack();
                        } else if (route.params && route.params.isPayment) {
                            console.log("printed");
                            dispatch(setPaymentsCustomer(customer));
                            navigation.goBack();
                        } else {
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
