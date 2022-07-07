import React from "react";
import { Avatar, Button, ListItem } from "react-native-elements";
import { Order } from "../../../../common/entities/order.entity";

type Props = {
    order: Order;
    onPress: (order: Order) => void;
};

export const OrderItemComponent: React.FC<Props> = (props) => {
    return (
        // @ts-ignore
        <ListItem
            onPress={() => props.onPress(props.order)}
            bottomDivider={true}
        >
            <ListItem.Content style={{ flex: 1 }}>
                <ListItem.Content
                    style={{
                        alignItems: "center",
                        margin: 0,
                        flexDirection: "row",
                    }}
                >
                    <Avatar
                        size={32}
                        rounded
                        containerStyle={{ backgroundColor: "red" }}
                        title={props.order.customer.initials}
                    />
                    <ListItem.Content style={{ marginLeft: 10 }}>
                        <ListItem.Title>
                            {props.order.customer.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {props.order.status}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
