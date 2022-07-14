import React, { useEffect } from "react";
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

type Props = {
    route: RouteProp<ParamList, "customersNavigator">;
    navigation: StackNavigationProp<ParamList, "customersNavigator">;
};

export const CustomersListScreen: React.FC<Props> = ({ route, navigation }) => {
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

    useEffect(() => {
        dispatch(fetchCustomers());
    }, []);

    return (
        <FlatList<User>
            style={{ flex: 1 }}
            data={customersState.entities}
            renderItem={({ item }) => (
                <CustomerItemComponent
                    customer={item}
                    onPress={(customer) =>
                        navigation.push("showCustomer", { customer: customer })
                    }
                />
            )}
        />
    );
};
