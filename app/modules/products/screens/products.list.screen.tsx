import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList } from "react-native";
import { Product } from "../../../common/entities/product.entity";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ProductItemComponent } from "./components/product.item.component";
import { fetchProducts } from "../redux/actions/product.actions";
import { addItem } from "../../orders/redux/actions/cart.actions";
import { OrderItemDto } from "../../orders/dtos/order.item.dto";
import { Icon } from "react-native-elements";
import { ActionState } from "../../../common/redux/entity.state.interface";
import { SearchBar } from "react-native-elements";
import { EmptyListItemComponent } from "../../../common/components/empty.list.item.component";
import { HeaderBackComponent } from "../../../common/components/header.back.component";

type Props = {
    route: RouteProp<ParamList, "productsNavigator">;
    navigation: StackNavigationProp<ParamList, "productsNavigator">;
};

export const ProductsListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [timeoutHandle, setTimeoutHandle] = useState(0);
    const [showRefreshControl, setShowRefreshControl] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [text, setText] = useState("");
    const [page, setPage] = useState(0);
    const productsState = useSelector(
        (state: ApplicationStateInterface) => state.productsState,
    );
    const dispatch = useDispatch();

    const changeText = (t: string) => {
        setShowRefreshControl(false);
        setText(t);
        clearTimeout(timeoutHandle);
        setTimeoutHandle(setTimeout(() => setSearchTerm(t), 300));
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackComponent onPress={() => navigation.goBack()} />
            ),
        });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Products",
            headerRight: () =>
                route.params && route.params.selectable ? null : (
                    <Icon
                        containerStyle={{ marginRight: 10 }}
                        size={28}
                        name="add-circle"
                        color="black"
                        tvParallaxProperties={undefined}
                        onPress={() =>
                            navigation.push("upsertProduct", {
                                product: undefined,
                            })
                        }
                    />
                    // </View>
                ),
        });
    }, []);

    useEffect(() => setPage(1), []);

    useEffect(() => {
        if (page > 0) {
            fetch();
        }
    }, [page, searchTerm]);

    useEffect(() => {
        console.log("hello");
        if (searchTerm !== "") {
            setPage(1);
        }
    }, [searchTerm]);

    const fetch = () => {
        dispatch(fetchProducts(page, searchTerm));
    };

    const fetchNext = () => {
        if (productsState.page && page < productsState.page.totalPages) {
            setPage(page + 1);
        }
    };

    const listHeader = () => {
        return (
            <SearchBar
                showLoading={
                    productsState.fetchState === ActionState.inProgress &&
                    !showRefreshControl
                }
                autoCapitalize={"none"}
                onChangeText={changeText}
                value={text}
                placeholder={"Search"}
            />
        );
    };

    return (
        <FlatList<Product>
            contentContainerStyle={{ flexGrow: 1 }}
            data={productsState.entities}
            onRefresh={() => {
                setPage(0);
                setPage(1);
                setShowRefreshControl(true);
            }}
            refreshing={
                productsState.fetchState === ActionState.inProgress &&
                showRefreshControl
            }
            onEndReachedThreshold={0.7}
            onEndReached={() => fetchNext()}
            ListEmptyComponent={
                productsState.fetchState !== ActionState.inProgress ? (
                    <EmptyListItemComponent />
                ) : null
            }
            ListHeaderComponent={
                productsState.entities.length === 0
                    ? searchTerm.length === 0
                        ? null
                        : listHeader()
                    : listHeader()
            }
            renderItem={({ item }) => (
                <ProductItemComponent
                    product={item}
                    onPress={(product) => {
                        if (route.params && route.params.selectable) {
                            dispatch(
                                addItem(
                                    new OrderItemDto(product, 1, product.price),
                                ),
                            );
                            navigation.goBack();
                        } else {
                            navigation.push("upsertProduct", {
                                product: product,
                            });
                        }
                    }}
                />
            )}
        />
    );
};
