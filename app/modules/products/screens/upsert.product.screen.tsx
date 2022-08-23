import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, FlatList, View, Keyboard } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import {
    addProduct,
    cleanupProducts,
    updateProduct,
} from "../redux/actions/product.actions";
import { ProductDto } from "../dtos/product.dto";

type Props = {
    route: RouteProp<ParamList, "upsertProduct">;
    navigation: StackNavigationProp<ParamList, "upsertProduct">;
};

export const UpsertProductScreen: React.FC<Props> = ({ route, navigation }) => {
    const product = route.params.product;
    const [name, setName] = useState(product?.name || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [isDefault, setIsDefault] = useState(product?.isDefault || false);
    const dispatch = useDispatch();
    const productsState = useSelector(
        (state: ApplicationStateInterface) => state.productsState,
    );

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                productsState.addState === ActionState.inProgress ||
                productsState.updateState === ActionState.inProgress ? (
                    <ActivityIndicator
                        style={{ marginRight: 10 }}
                        color={"black"}
                    />
                ) : (
                    <Icon
                        style={{ marginRight: 10 }}
                        size={28}
                        name="save"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() => {
                            Keyboard.dismiss();
                            product === undefined
                                ? dispatch(
                                      addProduct(
                                          new ProductDto(
                                              name || "",
                                              price || 0,
                                              isDefault || false,
                                          ),
                                      ),
                                  )
                                : dispatch(
                                      updateProduct(
                                          product.id,
                                          new ProductDto(
                                              name || "",
                                              price || 0,
                                              isDefault || false,
                                          ),
                                      ),
                                  );
                        }}
                    />
                ),
        });
    });

    useEffect(() => {
        if (
            productsState.addState === ActionState.done ||
            productsState.updateState === ActionState.done
        ) {
            dispatch(cleanupProducts());
            navigation.goBack();
        }
    }, [productsState.addState, productsState.updateState]);

    const rows = [
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    textAlign="left"
                    placeholder={"Name"}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
                <ListItem.Subtitle style={{ paddingRight: 10 }}>
                    Name
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <ListItem.Title style={{ paddingLeft: 10 }}>Rs.</ListItem.Title>
                <ListItem.Input
                    style={{ fontSize: 17 }}
                    autoCompleteType={""}
                    keyboardType={"numeric"}
                    textAlign="left"
                    placeholder={"Price"}
                    value={price.toString()}
                    onChangeText={(value) => setPrice(parseInt(value || "0"))}
                />
                <ListItem.Subtitle style={{ paddingRight: 10 }}>
                    Price
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
        // @ts-ignore
        <ListItem bottomDivider>
            <ListItem.Content
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <ListItem.CheckBox
                    checked={isDefault}
                    onPress={() => setIsDefault(!isDefault)}
                    containerStyle={{ paddingLeft: 10 }}
                />
                <ListItem.Subtitle style={{ paddingRight: 10 }}>
                    Is Default?
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>,
    ];

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={rows} renderItem={(item) => item.item} />
        </View>
    );
};
