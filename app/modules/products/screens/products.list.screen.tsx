import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamList } from "../../../common/param.list";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, View } from "react-native";
import { Product } from "../../../common/entities/product.entity";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateInterface } from "../../../common/redux/application.state.interface";
import { ProductItemComponent } from "./components/product.item.component";
import { fetchProducts } from "../redux/actions/product.actions";
import { addItem } from "../../orders/redux/actions/cart.actions";
import { OrderItemDto } from "../../orders/dtos/order.item.dto";
import { Icon, ListItem } from "react-native-elements";
import { ActionState } from "../../../common/redux/entity.state.interface";
import debouce from "lodash.debounce";

type Props = {
    route: RouteProp<ParamList, "productsNavigator">;
    navigation: StackNavigationProp<ParamList, "productsNavigator">;
};

export const ProductsListScreen: React.FC<Props> = ({ route, navigation }) => {
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const productsState = useSelector(
        (state: ApplicationStateInterface) => state.productsState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Products",
            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    size={28}
                    name="add-circle"
                    color="black"
                    tvParallaxProperties={undefined}
                    onPress={() =>
                        navigation.push("upsertProduct", { product: undefined })
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

    // const debouncedResults = useMemo(() => {
    //     console.log("debouncing");
    //     return _.debounce(handleChange, 1);
    // }, []);

    const handleChange = (e: any) => {
        console.log("text:", e.target.value);
        setSearchTerm(e.target.value);
    };

    return (
        <FlatList<Product>
            style={{ flex: 1 }}
            data={productsState.entities}
            onRefresh={() => {
                setPage(0);
                setPage(1);
            }}
            refreshing={productsState.fetchState === ActionState.inProgress}
            onEndReachedThreshold={0.7}
            onEndReached={() => fetchNext()}
            ListHeaderComponent={() => (
                <View
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                        height: 40,
                        paddingLeft: 10,
                    }}
                >
                    <Icon name={"search"} />
                    <ListItem.Input
                        onChang
                        eText={(text: string) => {
                            console.log("helele", text);
                            debouce(() => {
                                console.log("asdfadf");
                                setSearchTerm(text);
                            }, 0);
                        }}
                        autoCorrect={false}
                        placeholder={"Search"}
                        textAlign={"left"}
                        style={{ flex: 1 }}
                    />
                </View>
            )}
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
