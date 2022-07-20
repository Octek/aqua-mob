import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { OrderItemDto } from "../../dtos/order.item.dto";

type Props = {
    items: OrderItemDto[];
};

export const CartItemTotalComponent: React.FC<Props> = (props) => {
    const total = () =>
        props.items.reduce(
            (previous, current) => previous + current.quantity * current.price,
            0,
        );

    return (
        // @ts-ignore
        <ListItem bottomDivider={true}>
            <ListItem.Content style={{ flex: 0.5 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
                    <ListItem.Title>Total</ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Content
                style={{
                    flex: 0.5,
                    alignItems: "flex-end",
                }}
            >
                <ListItem.Title style={{ textAlign: "right" }}>
                    Rs. {total()}/-
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
};
