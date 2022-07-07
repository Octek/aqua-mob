import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { Product } from "../../../../common/entities/product.entity";

type Props = {
    product: Product;
    onPress: (product: Product) => void;
};

export const ProductItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem
            onPress={() => props.onPress(props.product)}
            bottomDivider={true}
        >
            <ListItem.Content style={{ marginLeft: 10 }}>
                <ListItem.Title>{props.product.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
