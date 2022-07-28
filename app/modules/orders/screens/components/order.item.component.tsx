import React from "react";
import { Avatar, Badge, Button, ListItem } from "react-native-elements";
import { Order } from "../../../../common/entities/order.entity";
import moment from "moment";
import { Text } from "react-native";

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
                    <ListItem.Content style={{ marginLeft: 10 }}>
                        <ListItem.Title>
                            <Text>{props.order.customer.name}</Text>
                            <Badge
                                containerStyle={{ padding: 1, marginLeft: 5 }}
                                textStyle={{
                                    color: props.order.statusInfo.textColor,
                                }}
                                value={props.order.statusInfo.text}
                                badgeStyle={{
                                    backgroundColor:
                                        props.order.statusInfo.backgroundColor,
                                }}
                            />
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {moment(props.order.createdAt).fromNow()}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Title>{props.order.total} Rs.</ListItem.Title>
                </ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
        </ListItem>
    );
};
