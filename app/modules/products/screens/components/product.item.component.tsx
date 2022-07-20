import React from "react";
import { Avatar, Badge, Button, ListItem } from "react-native-elements";
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
            <ListItem.Content
                style={{
                    alignContent: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                }}
            >
                <ListItem.Title>
                    {props.product.name}
                    {props.product.isDefault && (
                        <Badge
                            badgeStyle={{ borderRadius: 0 }}
                            containerStyle={{ borderRadius: 0, marginLeft: 10 }}
                            value={"default"}
                        />
                    )}
                </ListItem.Title>
            </ListItem.Content>
            <ListItem.Title>Rs. {props.product.price}/-</ListItem.Title>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
