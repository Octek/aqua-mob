import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { OrderItemDto } from "../../dtos/order.item.dto";

type Props = {
    item: OrderItemDto;
};

export const CartItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem bottomDivider={true}>
            <ListItem.Content style={{ flex: 0.5 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: "row" }}>
                    <ListItem.Title style={{ fontWeight: "bold" }}>
                        {props.item.quantity}
                    </ListItem.Title>
                    <ListItem.Title>
                        {" "}
                        x {props.item.product.name}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Content
                style={{
                    flex: 0.5,
                    alignItems: "flex-end",
                }}
            >
                <ListItem.Title style={{ textAlign: "right" }}>
                    Rs. {props.item.price * props.item.quantity}/-
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
};
