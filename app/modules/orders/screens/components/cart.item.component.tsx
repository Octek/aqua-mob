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
            <ListItem.Content style={{ flex: 1 }}>
                <ListItem.Content style={{ flexDirection: "row" }}>
                    <ListItem.Title>{props.item.quantity}</ListItem.Title>
                    <ListItem.Title>{props.item.productId}</ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
