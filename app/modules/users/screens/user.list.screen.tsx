import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cleanupUsers, fetchUsers } from "../redux/actions/users.actions";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { User } from "../../../common/entities/user.entity";
import { UserItemComponent } from "./components/user.item.component";
import { Icon } from "react-native-elements";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "productsNavigator">;
    navigation: StackNavigationProp<ParamList, "productsNavigator">;
};
export const UserListScreen: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackComponent onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Users",
            headerRight: () => (
                <Icon
                    containerStyle={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() => {
                        dispatch(cleanupUsers());
                        navigation.push("addUser");
                    }}
                />
            ),
        });
    });

    const usersState = useSelector(
        (state: ApplicationStateInterface) => state.usersState,
    );

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if (usersState.fetchState === ActionState.done) {
            console.log("userData===", usersState.entities);
        }
    }, [usersState.fetchState]);

    return (
        // @ts-ignore
        <FlatList<User>
            style={{ flex: 1 }}
            data={usersState.entities}
            // keyExtractor={(customer) => customer.id.toString()}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
                // <View>
                //     <Text>{item.name}</Text>
                // </View>
                <UserItemComponent user={item} />
            )}
        />
    );
};
