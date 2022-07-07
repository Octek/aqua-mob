import React, { useEffect } from "react";
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

type Props = {
    route: RouteProp<ParamList, "products">;
    navigation: StackNavigationProp<ParamList, "products">;
};

export const ProductsListScreen: React.FC<Props> = ({ route, navigation }) => {
    const productsState = useSelector(
        (state: ApplicationStateInterface) => state.productsState,
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <FlatList<Product>
            style={{ flex: 1 }}
            data={productsState.entities}
            renderItem={({ item }) => (
                <ProductItemComponent
                    product={item}
                    onPress={(product) => {
                        dispatch(
                            addItem(
                                new OrderItemDto(product.id, 1, product.price),
                            ),
                        );
                        navigation.goBack();
                        //navigation.push("showProduct", { product: product })
                    }}
                />
            )}
        />
    );
};
